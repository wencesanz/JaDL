export const config = { runtime: 'edge' };

// Fetches a studio's homepage, extracts its Open Graph (or Twitter) image, and
// 302-redirects to it. This is a curated, higher-quality representative image
// when the studio has set one — used as the primary hero source, with the
// mshots screenshot as the client-side fallback when this returns no image.
export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target || !/^https?:\/\//i.test(target)) {
    return new Response('Bad url', { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; JustADesignListBot/1.0; +https://www.justadesignlist.com)',
        accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return new Response('Fetch failed', { status: 404 });

    // Only read the <head>; images are declared there. Cap at ~150KB.
    const html = (await res.text()).slice(0, 150_000);

    const pick = (prop: string) => {
      const re = new RegExp(
        `<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`,
        'i',
      );
      const m = html.match(re);
      if (m) return m[1];
      // content-before-property ordering
      const re2 = new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`,
        'i',
      );
      const m2 = html.match(re2);
      return m2 ? m2[1] : null;
    };

    let img =
      pick('og:image:secure_url') ||
      pick('og:image:url') ||
      pick('og:image') ||
      pick('twitter:image') ||
      pick('twitter:image:src');

    if (!img) return new Response('No image', { status: 404 });

    // Resolve protocol-relative and root-relative URLs against the target.
    img = img.trim();
    if (img.startsWith('//')) img = 'https:' + img;
    else if (img.startsWith('/')) img = new URL(img, target).href;
    else if (!/^https?:\/\//i.test(img)) img = new URL(img, target).href;

    return new Response(null, {
      status: 302,
      headers: {
        location: img,
        // Cache the resolution at the edge for a day.
        'cache-control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return new Response('Error', { status: 404 });
  }
}
