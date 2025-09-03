import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://auth.privy.io https://www.googletagmanager.com https://js.stripe.com https://verify.walletconnect.com https://verify.walletconnect.org;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https: blob:;
              connect-src 'self' https://auth.privy.io https://api.privy.io https://rpc.walletconnect.com https://registry.walletconnect.com https://pulse.walletconnect.org https://api.avax-test.network https://rpc.ankr.com wss://relay.walletconnect.com;
              frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://js.stripe.com;
              worker-src 'self' blob:;
              child-src 'self' blob:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: "X-Frame-Options", 
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
