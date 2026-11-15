/**
 * Markdown for agents: a request that sends "Accept: text/markdown" gets the
 * Markdown copy of the page (md/<path>.md, written by scripts/markdown.mjs in
 * every sync). Browsers never send that header, so they keep getting HTML.
 * Any other request passes straight through.
 */
export const config = {
  runtime: 'edge',
  matcher: ['/((?!api/|md/|dist/|vendor/|fonts/|icons/|screenshots/|\\.well-known/|.*\\.[a-zA-Z0-9]+$).*)'],
};

export default async function middleware(request) {
  const accept = request.headers.get('accept') || '';
  if (!/(^|[\s,])text\/markdown\b/i.test(accept)) return;

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/index';
  if (!/^\/[a-z0-9\-/]+$/.test(path)) return;

  const res = await fetch(new URL(`/md${path}.md`, url.origin));
  if (!res.ok) return;
  const text = await res.text();
  const canonical = url.origin + (path === '/index' ? '/' : path);
  return new Response(text, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(text.length / 4)),
      'vary': 'Accept',
      'link': `<${canonical}>; rel="canonical"`,
      'cache-control': 'public, max-age=300',
      'access-control-allow-origin': '*',
    },
  });
}
