import type { NextConfig } from "next";

const wordpressHostname =
  process.env.WORDPRESS_HOSTNAME || "us1.wpdemo.org";
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: wordpressHostname,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    const rules = [
      // WooCommerce order-received → our success page
      {
        source: "/checkout/order-received/:orderId",
        destination: "/checkout/success?order=:orderId",
        permanent: false,
      },
      // WordPress My Account → our custom account dashboard
      {
        source: "/my-account",
        destination: "/account",
        permanent: false,
      },
      {
        source: "/my-account/:path*",
        destination: "/account",
        permanent: false,
      },
      // /posts/* → /blog/*
      { source: "/posts", destination: "/blog", permanent: true },
      { source: "/posts/:path*", destination: "/blog/:path*", permanent: true },
    ];
    if (wordpressUrl) {
      rules.push({
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      });
    }
    return rules;
  },
};

export default nextConfig;
