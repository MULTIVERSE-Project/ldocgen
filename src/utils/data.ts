import GeneratedData from "./../../config/generated.json";

export const getModules = () => {
  return GeneratedData;
};

export const getModule = (name: string) => {
  return GeneratedData.find((module) => module.name === name);
};
