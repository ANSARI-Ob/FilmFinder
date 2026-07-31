/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Next.js <Image /> to load our placeholder poster images
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "placehold.co",
    },
  ],
  dangerouslyAllowSVG: true,
  contentDispositionType: "attachment",
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
},
};

module.exports = nextConfig;
