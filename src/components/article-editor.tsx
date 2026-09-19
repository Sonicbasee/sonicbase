import { useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const tools = [
  { label: "Bold", prefix: "**", suffix: "**" },
  { label: "Italic", prefix: "*", suffix: "*" },
  { label: "Strike", prefix: "~~", suffix: "~~" },
  { label: "Heading", prefix: "## ", suffix: "" },
  { label: "Quote", prefix: "> ", suffix: "" },
  { label: "Bullet list", prefix: "- ", suffix: "" },
] as const;

export function ArticleEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function wrapSelection(prefix: string, suffix: string) {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = value.slice(start, end) || "your text";
    const nextValue = `${value.slice(0, start)}${prefix}${selected}${suffix}${value.slice(end)}`;
    onChange(nextValue);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    });
  }

  function addLink() {
    const url = window.prompt("Paste the link URL");
    if (url) wrapSelection("[", `](${url})`);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 p-2">
        {tools.map((tool) => (
          <Button key={tool.label} type="button" variant="ghost" size="sm" onClick={() => wrapSelection(tool.prefix, tool.suffix)}>
            {tool.label}
          </Button>
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={addLink}>Link</Button>
      </div>
      <textarea
        ref={inputRef}
        className="min-h-64 w-full resize-y border-0 bg-transparent px-3 py-3 text-sm leading-relaxed outline-none focus:ring-0"
        placeholder="Write the full story, then use the formatting controls above."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">Separate paragraphs with a blank line.</p>
    </div>
  );
}

function formatInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
  const parts = text.split(pattern);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("~~") && part.endsWith("~~")) return <del key={index}>{part.slice(2, -2)}</del>;
    const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (linkMatch) return <a key={index} href={linkMatch[2]} target="_blank" rel="noreferrer" className="underline underline-offset-4">{linkMatch[1]}</a>;
    return <span key={index}>{part}</span>;
  });
}

export function FormattedArticle({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-6">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("## ")) return <h2 key={index} className="display-title pt-4 text-3xl sm:text-4xl">{formatInline(trimmed.slice(3))}</h2>;
        if (trimmed.startsWith("> ")) return <blockquote key={index} className="border-l-2 border-foreground/30 pl-5 text-xl italic text-foreground">{formatInline(trimmed.slice(2))}</blockquote>;
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) return <li key={index} className="ml-5 list-disc pl-2">{formatInline(trimmed.slice(2))}</li>;
        return <p key={index}>{formatInline(trimmed)}</p>;
      })}
    </div>
  );
}
