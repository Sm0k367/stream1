/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enable static export for GitHub Pages
  output: 'export',
  
  // 2. Set the base path to match your repository name
  // This ensures your assets load from /stream1/ instead of /
  basePath: '/stream1',
  assetPrefix: '/stream1',

  // 3. Disable image optimization (required for static export)
  images: {
    unoptimized: true,
  },

  // 4. Handle Three.js and Transpilation
  transpilePackages: ['three'],
};

export default nextConfig;
