/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        API_KEY: process.env.API_KEY,
        DELIVERY_TOKEN: process.env.DELIVERY_TOKEN,
        ENVIRONMENT: process.env.ENVIRONMENT,
        PREVIEW_TOKEN: process.env.PREVIEW_TOKEN
    }
};

export default nextConfig;
