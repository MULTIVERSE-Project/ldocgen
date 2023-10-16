import { LDocItem } from "@/types/data";
import { FC } from "react";
import Realm from "./Realm";
import { AlertTriangleIcon } from "lucide-react";
import Description from "./Description";
import { processRawData } from "@/data/processing";

interface FunctionProps {
  item: LDocItem;
}

const transformDescription = (description: string, baseModule: string) => {
  const modules = processRawData();

  return description.replace(/@{([^}]+)}/g, (m, p1: string) => {
    let isGlobalReference = p1.includes(".");

    if (!isGlobalReference) {
      // check current module for items where item.name == p1
      const currModule = modules.find((module) => module.name === baseModule);

      if (!currModule) return `\`${p1}\``; // cant find current module, should never happen, but hey, just bail out.

      const quilifiedItem = currModule.items.find(
        (item) => item.namePieces[item.namePieces.length - 1] === p1 // check only last key
      );

      if (quilifiedItem) return `\`${baseModule}.${p1}\``; // Ladies and gentelmen, we got em'

      // if no luck above, we're jus referencing another module, let's just assume it (edge case)
      return `\`${p1}\``;
    }

    return `\`${p1}\``;
  });
};

const Function: FC<FunctionProps> = ({ item }) => {
  const description = transformDescription(item.description, item.module);

  return (
    <section id={item.name} className="bg-border p-4 scroll-m-24">
      <div className="flex items-center">
        <Realm realm={item.realm} />
        <h3 className="text-lg font-mono">
          {item.name}
          {item.args}
        </h3>
      </div>
      <div className="">
        {item.tags.find((tag) => tag.tag === "internal") && (
          <div className="border-2 border-red-400 my-4">
            <p className="text-lg font-semibold flex items-center gap-2 bg-red-400 py-2 px-3 text-white">
              <AlertTriangleIcon className="" /> Internal
            </p>
            <p className="py-2 px-3">
              This is an internal function! You are able to use it, but you risk
              unintended side effects if used incorrectly.
            </p>
          </div>
        )}
        <p>{item.summary}</p>
        <Description description={description} />

        {item.params.length > 0 && (
          <div className="mt-4">
            <h4 className="text-blue-500 uppercase">Arguments</h4>
            <div className="flex flex-col gap-4 ml-4 mt-1">
              {item.params.map((arg) => {
                const description = transformDescription(
                  arg.description,
                  item.module
                );

                return (
                  <div key={arg.name} className="space-y-1">
                    <div className="flex gap-2 font-mono text-sm">
                      <p className="bg-blue-800 text-white p-1 px-3 ">
                        {arg.name}
                      </p>
                      {arg.type && (
                        <p className="bg-emerald-600 text-white p-1 px-3">
                          {arg.type}
                        </p>
                      )}
                      {arg.default && (
                        <p className="bg-orange-700 text-white p-1 px-3">
                          default: {arg.default}
                        </p>
                      )}
                      {arg.optional && (
                        <p className="bg-orange-700 text-white p-1 px-3">
                          optional
                        </p>
                      )}
                    </div>
                    <div className="ml-5">
                      <Description description={description} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Function;
