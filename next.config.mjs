/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/auth/sign-in",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
