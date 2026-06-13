import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Config mínima: cache incremental em memória (suficiente para o site
// institucional VL Builds, que não usa ISR/revalidação pesada).
// Se no futuro precisar de cache persistente, trocar por r2IncrementalCache.
export default defineCloudflareConfig();
