import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/Shafi_ParambilE" : "",
  assetPrefix: isProd ? "/Shafi_Parambil/" : "",
  images: {
    domains: ["img.youtube.com", "res.cloudinary.com", "fonts.googleapis.com"],
  },
};

export default nextConfig;
