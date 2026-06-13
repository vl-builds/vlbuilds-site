/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;

// Habilita o binding do Cloudflare (getCloudflareContext) durante `next dev`.
// Não tem efeito no build de produção.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
