/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This ensures static export works correctly
  basePath: '',
  // Disable server features we don't need for static export
  trailingSlash: true,
}

module.exports = nextConfig