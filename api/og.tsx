import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

// The index wordmark, as an inline SVG data URI (same glyph as the favicon).
const MARK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="88" height="88">' +
      '<g fill="none" stroke="#0B0B0B" stroke-width="2.2" stroke-linecap="square">' +
      '<path d="M7 10 H14"/><path d="M17 10 H25"/><path d="M7 15 H17"/>' +
      '<path d="M20 15 H25"/><path d="M7 20 H14"/><path d="M17 20 H25"/><path d="M7 25 H18"/>' +
      '</g></svg>'
  );

// Load the brand serif at runtime (cached by the edge network). If it fails,
// we render with the built-in default font rather than erroring out.
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      'https://cdn.jsdelivr.net/npm/@fontsource/instrument-serif@5/files/instrument-serif-latin-400-normal.woff'
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get('name') || 'Just a Design List').slice(0, 80);
  const meta = (searchParams.get('meta') || 'A curated directory of design practices').slice(0, 140);

  // Scale the wordmark down for long studio names.
  const nameSize = name.length > 30 ? 62 : name.length > 20 ? 82 : 104;

  const serif = await loadSerif();
  const fonts = serif
    ? [{ name: 'Instrument Serif', data: serif, style: 'normal' as const, weight: 400 as const }]
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: '#FBFBFA',
          fontFamily: 'Instrument Serif, serif',
          border: '2px solid #D6D6D2',
        }}
      >
        {/* top: mark */}
        <div style={{ display: 'flex' }}>
          <img src={MARK} width={88} height={88} />
        </div>

        {/* middle: kicker + name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '5px', background: '#F95721', marginRight: '18px' }} />
            <div
              style={{
                fontSize: '26px',
                letterSpacing: '2px',
                color: '#7B7B7B',
                textTransform: 'uppercase',
              }}
            >
              {meta}
            </div>
          </div>
          <div style={{ fontSize: `${nameSize}px`, color: '#0B0B0B', lineHeight: 1.05, marginTop: '18px' }}>
            {name}
          </div>
        </div>

        {/* bottom: url + brand */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '26px', color: '#7B7B7B' }}>justadesignlist.com</div>
          <div style={{ fontSize: '30px', color: '#0B0B0B' }}>Just a Design List</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts ? { fonts } : {}) }
  );
}
