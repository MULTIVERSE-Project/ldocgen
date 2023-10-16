import { getModule, getModules } from "@/utils/data";
import { useLoaderData } from "react-router-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Markdown from "react-markdown";
import { processRawData } from "@/data/processing";
import Function from "@/components/module/Function";
import Table from "@/components/module/Table";

const Description = ({ description }: { description: string }) => {
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

          return (
            <code className="bg-gray-300 rounded-md p-1" {...rest}>
              {children}
            </code>
          );
        },
      }}
    >
      {description}
    </Markdown>
  );
};

const Module = ({}) => {
  const moduleId = useLoaderData() as string;

  const module = processRawData().find((module) => module.name === moduleId)!;
  const functions = module.items.filter((item) => {
    if (!item) return false;

    return item.kind === "functions";
  });
  const tables = module.items.filter((item) => {
    if (!item) return false;

    return item.kind === "tables";
  });

  return (
    <div>
      {/* Module header */}
      <div className="border-b mb-2 pb-3">
        <h1 className="text-4xl font-bold font-mono">{module.name}</h1>
        <p>{module.summary}</p>
      </div>

      {/* Module description */}
      {module.description !== "" && (
        <div className="border-b pb-2 mb-2">
          <Description description={module.description} />
        </div>
      )}

      {/* Tables */}
      {tables.length > 0 && (
        <div>
          <h2 className="text-blue-500 uppercase">Tables</h2>
          <div className="flex flex-col gap-2">
            {tables.map((func) => {
              return <Table key={func.name} item={func} />;
            })}
          </div>
        </div>
      )}

      {/* Functions */}
      {functions.length > 0 && (
        <div>
          <h2 className="text-blue-500 uppercase">Functions</h2>
          <div className="flex flex-col gap-2">
            {functions.map((func) => {
              return <Function key={func.name} item={func} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Module;

export const loader = async ({ params }: any) => {
  const { id } = params as { id: string };

  const module = getModule(id);

  if (!module) {
    return null;
  }

  return id;
};

export const getStaticPaths = async () => {
  const routes = processRawData().map((module) => {
    return `/docs/${module.name}`;
  });
  return routes;
};
