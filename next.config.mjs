/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Gera um build "standalone" (server.js + deps mínimas) ideal para Docker.
  output: 'standalone',
  // Permite imagens remotas (capas vindas do Unsplash / avatares).
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
