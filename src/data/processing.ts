import { LDocModule, LDocItem } from "@/types/data";
import { LDocGeneratedData } from "./json";

const VALID_MODULE_KINDS = ["module", "classmod"];

type SingleModule = (typeof LDocGeneratedData)[0];

const processModuleItemRawData = (
  item: SingleModule["items"][0],
  partialModule: Omit<LDocModule, "items">
) => {
  const {
    kind,
    name,
    summary,
    description,

    args,

    tags,
    modifiers,

    parameter,
    paramsList,
    paramsMap,

    names_hierarchy,
  } = item;

  // if (type !== "function") {
  //   return undefined;
  // }

  const { realm, ...restTags } = tags;
  if (!realm) {
    throw new Error(`Missing realm tag for ${name}`);
  }

  const processedRealm = realm[0];

  const processedTags = Object.entries(restTags).map(([tag, value]) => ({
    tag,
    value,
  }));

  const processedParams = ((Array.isArray(paramsList) && paramsList) || []).map(
    (param: string) => {
      const paramDescription = (paramsMap as Record<string, string>)[param];
      const paramMeta = (
        (modifiers as any)[parameter] as Record<
          string,
          {
            type: string;
            opt: string | boolean;
          }
        >
      )[param];

      const paramType = paramMeta.type;
      const paramOptional = typeof paramMeta.opt === "boolean" ? true : false;
      const paramDefault =
        typeof paramMeta.opt === "string" ? paramMeta.opt : undefined;

      return {
        name: param,
        description: paramDescription,
        type: paramType,
        optional: paramOptional,
        default: paramDefault,
      };
    }
  );

  return {
    kind,
    name,
    namePieces: names_hierarchy,
    summary,
    description,
    args,

    realm: processedRealm,

    tags: processedTags,
    params: processedParams,

    module: partialModule.name,
  } as LDocItem;
};

const processModuleRawData = (module: SingleModule) => {
  const { name, summary, description, kind, items, type } = module;

  if (!VALID_MODULE_KINDS.includes(type)) {
    throw new Error(`Invalid module kind: ${kind}`);
  }

  const processedModule = {
    name,
    summary,
    description,
    type: kind,
  } as Omit<LDocModule, "items">;

  const processedItems = items.map((rawItem) =>
    processModuleItemRawData(rawItem, processedModule)
  );

  return {
    ...processedModule,
    items: processedItems,
  } as LDocModule;
};

export const processRawData = () => {
  const modules = LDocGeneratedData.map(processModuleRawData) as LDocModule[];

  // sort modules by name
  modules.sort((a, b) => a.name.localeCompare(b.name));

  return modules;
};
