import { processRawData } from "@/data/processing";
import { LDocModule } from "@/types/data";
import { FC } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

interface DescriptionProps {
  description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <Markdown
      className={"flex flex-col gap-1"}
      components={{
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
                language="typescript"
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
              <code className="bg-gray-300 rounded-md p-1" {...rest}>
                {children}
              </code>
            </>
          );
        },
      }}
    >
      {description}
    </Markdown>
  );
};

export default Description;
