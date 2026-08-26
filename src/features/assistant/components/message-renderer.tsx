import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageRendererProps {
  content: string
}

/** react-markdown never injects raw HTML into the DOM by default, so assistant output is safe to render directly. */
export function MessageRenderer({ content }: MessageRendererProps) {
  return (
    <div className="max-w-none space-y-2 text-sm break-words text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_strong]:font-semibold [&_h1]:mt-2 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:mt-2 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:text-sm [&_h3]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => <a {...props} className="underline underline-offset-2" target="_blank" rel="noreferrer noopener" />,
          code: ({ className, children, ...props }) => (
            <code className={`rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] ${className ?? ''}`} {...props}>
              {children}
            </code>
          ),
          pre: ({ children, ...props }) => (
            <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs" {...props}>
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="border-collapse text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border bg-muted px-2 py-1 text-left font-medium" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-2 py-1" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
