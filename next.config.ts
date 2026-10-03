import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // www -> apex
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.smartphysioplus.com" }],
        destination: "https://smartphysioplus.com/:path*",
        permanent: true,
      },
      // Legacy paths from the old microsite (smart-physio-dr.grexa.site)
      {
        source: "/products-services",
        destination: "/services/",
        permanent: true,
      },
      { source: "/posts", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
