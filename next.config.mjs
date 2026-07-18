/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hotmart.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },  // outros buckets S3
      { protocol: 'https', hostname: 'i.ibb.co' },          // imgbb (upload gratuito)
      { protocol: 'https', hostname: 'res.cloudinary.com' }, // cloudinary
    ],
  },
};

export default nextConfig;
