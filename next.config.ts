import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* config options here */ 
  eslint: {
		ignoreDuringBuilds: true,
	},
  experimental:{
    serverActions:{
      bodySizeLimit:"4mb"
    },
    
  },
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"qevgzetbgcbflzba.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
