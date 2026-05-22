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
    // Order total passed from Next.js (already in major units, e.g. 49980.00 for NT$49,980)
    $order_total = floatval($request->get_param('total') ?? 0);

    // Boot WooCommerce cart subsystem so payment gateways initialise correctly
    if (function_exists('wc_load_cart')) {
        wc_load_cart();
    }

    // Fake cart totals so is_available() can evaluate amount-based conditions.
    // We set both the cart object properties and hook the getter filters that
    // individual gateways may call (e.g. get_subtotal, get_cart_contents_total).
    if ($order_total > 0 && WC()->cart) {
        WC()->cart->subtotal              = $order_total;
        WC()->cart->cart_contents_total   = $order_total;
        WC()->cart->total                 = $order_total;

        add_filter('woocommerce_cart_get_subtotal',            fn() => $order_total, 999);
        add_filter('woocommerce_cart_get_cart_contents_total', fn() => $order_total, 999);
        add_filter('woocommerce_cart_get_total',               fn() => $order_total, 999);
    }

    // Satisfy the "is this the checkout?" check that some gateways require
    add_filter('woocommerce_is_checkout', '__return_true');

    $available = [];
    $gateways  = WC()->payment_gateways()->payment_gateways();

    foreach ($gateways as $gateway) {
        if ($gateway->enabled !== 'yes') continue;
        try {
            if ($gateway->is_available()) {
                $available[] = [
                    'id'    => $gateway->id,
                    'title' => $gateway->get_title(),
                ];
            }
        } catch (Throwable $e) {
            // Skip gateways that throw on is_available()
        }
    }

    return rest_ensure_response($available);
}
