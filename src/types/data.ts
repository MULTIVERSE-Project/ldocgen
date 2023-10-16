interface LDocModule {
  type: "module" | "classmod";
  name: string;

  summary: string;
  description: string;

  items: LDocItem[];
}

interface LDocItem {
  kind: "functions" | "tables";

  module: string;

  name: string;
  namePieces: string[];
  summary: string;
  description: string;

  args: string;

  realm: "client" | "server" | "shared";
  tags: {
    tag: string;
    value: any;
  }[];

  params: {
    name: string;
    description: string;

    type: string;
    optional: boolean;
    default: string;
  }[];

  // returns: {
  //   type: string;
  //   description: string;
  // }[];
}

export type { LDocModule, LDocItem };
