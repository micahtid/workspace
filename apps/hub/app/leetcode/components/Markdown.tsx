"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// Notes are Python-only, so register just Python and default unlabeled
// fences to it. Keeps the bundle small vs. importing all of Prism.
SyntaxHighlighter.registerLanguage("python", python);

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="text-xl font-semibold mt-6 mb-3" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-lg font-semibold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="text-base font-semibold mt-5 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-3 leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-3 ml-5 list-disc space-y-1" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-3 ml-5 list-decimal space-y-1" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  code: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"code">) => {
    const text = String(children ?? "");
    const isBlock = /language-/.test(className ?? "") || text.includes("\n");
    if (isBlock) {
      const match = /language-(\w+)/.exec(className ?? "");
      const language = match?.[1] ?? "python";
      return (
        <div className="bg-ink-50 rounded-xl overflow-x-auto">
          <SyntaxHighlighter
            language={language}
            style={oneLight}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
            codeTagProps={{
              style: {
                fontFamily: "var(--font-mono)",
                background: "transparent",
              },
            }}
          >
            {text.replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code
        className="bg-ink-100 rounded px-1.5 py-0.5 text-[13px] font-mono"
        {...props}
      />
    );
  },
  pre: (props: React.ComponentProps<"pre">) => (
    <div className="my-4">{props.children}</div>
  ),
};

export function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
