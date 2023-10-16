import { LDocItem } from "@/types/data";
import { FC } from "react";
import Realm from "./Realm";
import { AlertTriangleIcon } from "lucide-react";

interface TableProps {
  item: LDocItem;
}

const Table: FC<TableProps> = ({ item }) => {
  return (
    <section id={item.name} className="bg-border p-4">
      <div className="flex items-center">
        <Realm realm={item.realm} />
        <h3 className="text-lg font-mono">{item.name}</h3>
      </div>
      <div>
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
        <p>{item.description}</p>

        {item.params.length > 0 && (
          <div className="mt-4">
            <h4 className="text-blue-500 uppercase">Fields</h4>

            <div className="grid grid-cols-2 gap-4 ml-4 mt-1">
              {item.params.map((arg) => (
                <div key={arg.name}>
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
                  <p className="ml-5">{arg.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Table;
