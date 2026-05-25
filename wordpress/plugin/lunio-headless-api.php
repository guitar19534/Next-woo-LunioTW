<?php
/**
 * Plugin Name: Lunio Headless API
 * Description: Custom REST endpoints for the Next.js headless storefront.
 * Version:     2.0
 * Author:      Lunio
 */

if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('lunio/v1', '/payment-methods', [
        'methods'             => 'GET',
        'callback'            => 'lunio_get_payment_methods',
        'permission_callback' => 'lunio_check_secret',
    ]);
});

function lunio_check_secret(WP_REST_Request $request): bool {
    $secret = defined('LUNIO_API_SECRET') ? LUNIO_API_SECRET : 'lunio-headless-secret-2025';
    return $request->get_header('X-Lunio-Secret') === $secret;
}

function lunio_get_payment_methods(WP_REST_Request $request): WP_REST_Response {
    // wc_load_cart() hooks calculate_totals() into woocommerce_cart_loaded_from_session
    // (priority 5). Remove it at priority 4 so WC loads the cart without recalculating
    // shipping / taxes — we only need cart contents for gateway eligibility checks.
    add_action('woocommerce_cart_loaded_from_session', function($cart) {
        remove_action('woocommerce_cart_loaded_from_session', array($cart, 'calculate_totals'), 5);
    }, 4);

    // Next.js forwards the browser Cookie header; wc_load_cart() reads $_COOKIE and
    // restores the real user session so gateways see the actual cart products.
    if (function_exists('wc_load_cart')) {
        wc_load_cart();
    }

    // Fallback: if the session cart is still empty (session expired or not forwarded),
    // populate a temporary in-memory cart from the product IDs sent by Next.js.
    $ids_param = sanitize_text_field($request->get_param('ids') ?? '');
    if ($ids_param && WC()->cart->is_empty()) {
        $product_ids = array_filter(array_map('absint', explode(',', $ids_param)));
        foreach ($product_ids as $product_id) {
            $product = wc_get_product($product_id);
            if (!$product) continue;
            $cart_key = 'lunio_tmp_' . $product_id;
            WC()->cart->cart_contents[$cart_key] = [
                'key'          => $cart_key,
                'product_id'   => $product_id,
                'variation_id' => 0,
                'quantity'     => 1,
                'data'         => $product,
            ];
        }
    }

    // Always override the cart total from the passed param.
    // We skip calculate_totals() for speed, so WC()->cart->total stays 0 even when
    // the session loads correctly — causing amount-based gateways to fail their min
    // check. Setting it explicitly ensures installment gateways evaluate correctly.
    $cart_total = floatval($request->get_param('total') ?? 0);
    if ($cart_total > 0) {
        WC()->cart->cart_contents_total = $cart_total;
        WC()->cart->total               = $cart_total;
    }

    add_filter('woocommerce_is_checkout', '__return_true');

    // Block outgoing HTTP — installment gateways call external APIs when they see a
    // real cart; blocking forces fast local-only evaluation (categories / min amount).
    $block_http = function($preempt, $args, $url) {
        return new WP_Error('lunio_blocked', 'External HTTP blocked during payment availability check.');
    };
    add_filter('pre_http_request', $block_http, 99, 3);

    // get_available_payment_gateways() calls is_available() on each gateway AND applies
    // the woocommerce_available_payment_gateways filter — identical to native checkout.
    $gateways_available = WC()->payment_gateways()->get_available_payment_gateways();

    remove_filter('pre_http_request', $block_http, 99);

    $available = [];
    foreach ($gateways_available as $gateway) {
        $available[] = [
            'id'    => $gateway->id,
            'title' => $gateway->get_title(),
        ];
    }

    return rest_ensure_response($available);
}
