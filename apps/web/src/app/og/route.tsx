import { ImageResponse } from 'next/og';

// Dynamic OG — static Ticket variant (DESIGN.md §2). Fed by ?procedure=&home=&saved=.
export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const procedure = searchParams.get('procedure') ?? 'Dental implants in Tbilisi';
  const home = searchParams.get('home') ?? 'London → TBS';
  const atHome = searchParams.get('atHome') ?? '£10,800';
  const inGeorgia = searchParams.get('inGeorgia') ?? '$3,900';
  const nights = searchParams.get('nights') ?? '6 nights';
  const coordinator = searchParams.get('coordinator') ?? 'Nino';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          padding: 56,
          background: '#F6F8F7',
          fontFamily: 'system-ui, -apple-system',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            borderRadius: 24,
            background: 'white',
            boxShadow: '0 24px 48px -24px rgba(22,36,44,.35)',
            padding: 40,
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #D9E1DE',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ color: '#55656D', fontSize: 24 }}>{home}</div>
            <div style={{ color: '#16242C', fontSize: 36, fontWeight: 600 }}>{procedure}</div>
          </div>
          <div style={{ display: 'flex', gap: 56 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#55656D', fontSize: 24 }}>At home</span>
              <span
                style={{
                  color: '#16242C',
                  fontSize: 72,
                  fontWeight: 600,
                  textDecoration: 'line-through',
                }}
              >
                {atHome}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#55656D', fontSize: 24 }}>In Georgia</span>
              <span style={{ color: '#16242C', fontSize: 72, fontWeight: 700 }}>
                {inGeorgia}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 48, color: '#55656D', fontSize: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Stay</span>
              <span style={{ color: '#16242C', fontSize: 32 }}>{nights}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Coordinator</span>
              <span style={{ color: '#16242C', fontSize: 32 }}>{coordinator}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
