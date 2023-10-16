import { processRawData } from "@/data/processing";
import { LDocModule } from "@/types/data";
import { FC } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Markdown3rd from "react-markdown";

import gfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: any;
}

const Markdown: FC<MarkdownProps> = ({ children }) => {
  return (
    <div data-theme="light">
      <Markdown3rd
        remarkPlugins={[[gfm, { singleTilde: false }]]}
        className="space-y-2 markdown-body"
        // skipHtml={false}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold">{children}</h3>
          ),

          a: ({ children, ...rest }) => (
            <a
              className="text-blue-400 hover:text-blue-500 underline underline-offset-2 decoration-dotted"
              {...rest}
            >
              {children}
            </a>
          ),

          ul: ({ children, className }) => (
            <ul className={cn(className, "ml-4")}>{children}</ul>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-400 pl-4">
              {children}
            </blockquote>
          ),

          hr: () => <hr className="border-gray-300" />,

          code: (props) => {
            const { children, ...rest } = props;

            const isMultiLine = String(children).includes("\n");

            if (isMultiLine) {
              return (
                // @ts-ignore
                <SyntaxHighlighter
                  {...rest}
                  customStyle={{
                    borderRadius: "0.5rem",
                  }}
                  showLineNumbers={true}
                  children={String(children).replace(/\n$/, "")}
                  language="bash"
                  PreTag={"div"}
                />
              );
            }

            const str = String(children);

            // try to find link to another module

            const modules = processRawData();

            let found = false;
            let foundModule: LDocModule | undefined = undefined;

            modules.forEach((module) => {
              if (found) return;

              const foundItem = module.items.find((item) => {
                if (!item) return false;

                return item.name === str;
              });

              if (foundItem) {
                found = true;
                foundModule = module as LDocModule;
              }
            });

            if (found)
              return (
                <a
                  href={`/docs/${
                    (foundModule as unknown as LDocModule).name
                  }#${str}`}
                  className="text-blue-400 hover:text-blue-500 underline underline-offset-2 decoration-dotted"
                >
                  {str}
                </a>
              );

            return (
              <>
                <code className="bg-gray-300 rounded-md py-px px-1" {...rest}>
                  {children}
                </code>
              </>
            );
          },
        }}
      >
        {children}
      </Markdown3rd>
    </div>
  );
};

export default Markdown;
