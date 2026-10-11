export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // CSP-safe: no HTML, serialized to a safe JSON string. Replace < to avoid </script> breakout.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
