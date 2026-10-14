// Renders schema.org structured data (see lib/structuredData.js). `<` is
// escaped as recommended by the Next.js JSON-LD guide, so page text can
// never break out of the script tag.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
