// lastModified estático (atualizar manualmente em mudanças relevantes de conteúdo).
// Evita timestamp dinâmico, que sinalizaria "sempre atualizado" ao Google.
const LAST_MODIFIED = '2026-06-22';

export default function sitemap() {
  return [
    {
      url: 'https://vlbuilds.com',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://vlbuilds.com/politica-de-privacidade',
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
