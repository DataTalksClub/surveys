/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/demographics", destination: "/2025-2026/demographics", permanent: false },
      { source: "/community", destination: "/2025-2026/community", permanent: false },
      { source: "/ml-mlops", destination: "/2025-2026/ml-mlops", permanent: false },
      { source: "/data-engineering", destination: "/2025-2026/data-engineering", permanent: false },
      { source: "/ai-engineering", destination: "/2025-2026/ai-engineering", permanent: false },
      { source: "/ai-chatbots", destination: "/2025-2026/ai-chatbots", permanent: false },
    ]
  },
}

export default nextConfig