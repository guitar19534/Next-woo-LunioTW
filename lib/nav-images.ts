// Fetch product cover images for mega menu — cached 1h via Next.js Data Cache
const baseUrl = process.env.WORDPRESS_URL;
const ck = process.env.WC_CONSUMER_KEY;
const cs = process.env.WC_CONSUMER_SECRET;

const NAV_SLUGS = [
  "lunio-latex-mattress",
  "lunio-quantum",
  "nooz-helix",
  "nooz-sunset",
  "nooz-moonlight",
  "lunio-hypercool",
  "lunio-icefit",
  "lunio-nebula",
  "tencel-bedsheet",
  "tencel-duvet-cover",
  "lunio-protector",
  "lunio-snowsilk",
];

export async function getNavProductImages(): Promise<Record<string, string>> {
  if (!baseUrl || !ck || !cs) return {};

  try {
    const slugParam = NAV_SLUGS.join(",");
    const url = `${baseUrl}/wp-json/wc/v3/products?slug=${slugParam}&per_page=20&consumer_key=${ck}&consumer_secret=${cs}`;

    const res = await fetch(url, {
      next: { revalidate: 3600, tags: ["woocommerce"] },
    });

    if (!res.ok) return {};

    const products: Array<{ slug: string; images: Array<{ src: string }> }> = await res.json();

    return Object.fromEntries(
      products
        .filter((p) => p.images?.[0]?.src)
        .map((p) => [`/product/${p.slug}`, p.images[0].src])
    );
  } catch {
    return {};
  }
}
