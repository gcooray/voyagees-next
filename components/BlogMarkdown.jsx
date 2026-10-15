import Link from "next/link";

// Renders the small Markdown subset blog articles use, straight to React
// elements (no HTML strings, so nothing in an article can inject markup):
//
//   ## Heading / ### Subheading
//   - bullet list         1. numbered list
//   > tip box (consecutive "> " lines form one box)
//   **bold**, *italic*, [link text](/fr/plan-trip or https://…)
//
// Blank lines separate paragraphs.

const INLINE_SOURCE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/.source;

function renderInline(text, keyPrefix) {
  // a fresh regex per call: renderInline recurses (bold inside a link…),
  // and a shared /g regex's lastIndex would be reset by the inner call
  const inline = new RegExp(INLINE_SOURCE, "g");
  const parts = [];
  let last = 0;
  let match;
  let i = 0;

  while ((match = inline.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;

    if (match[1] !== undefined) {
      parts.push(<strong key={key}>{renderInline(match[1], key)}</strong>);
    } else if (match[2] !== undefined) {
      parts.push(<em key={key}>{renderInline(match[2], key)}</em>);
    } else {
      const href = match[4];
      parts.push(
        href.startsWith("/") ? (
          <Link key={key} href={href}>
            {match[3]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {match[3]}
          </a>
        )
      );
    }
    last = inline.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function toBlocks(markdown) {
  const blocks = [];
  let current = null;

  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flush();
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text: heading[2] });
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    const quote = line.match(/^>\s?(.*)$/);

    if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      if (current?.type !== type) {
        flush();
        current = { type, items: [] };
      }
      current.items.push((bullet || numbered)[1]);
    } else if (quote) {
      if (current?.type !== "tip") {
        flush();
        current = { type: "tip", lines: [] };
      }
      current.lines.push(quote[1]);
    } else {
      if (current?.type !== "p") {
        flush();
        current = { type: "p", lines: [] };
      }
      current.lines.push(line);
    }
  }
  flush();
  return blocks;
}

export default function BlogMarkdown({ markdown }) {
  return toBlocks(markdown).map((block, i) => {
    const key = `b${i}`;
    switch (block.type) {
      case "h2":
        return <h2 key={key}>{renderInline(block.text, key)}</h2>;
      case "h3":
        return <h3 key={key}>{renderInline(block.text, key)}</h3>;
      case "ul":
      case "ol": {
        const List = block.type;
        return (
          <List key={key}>
            {block.items.map((item, j) => (
              <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
            ))}
          </List>
        );
      }
      case "tip":
        return (
          <aside key={key} className="blog-tip">
            {renderInline(block.lines.filter(Boolean).join(" "), key)}
          </aside>
        );
      default:
        return <p key={key}>{renderInline(block.lines.join(" "), key)}</p>;
    }
  });
}
