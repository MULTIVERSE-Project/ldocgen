import { useLoaderData } from "react-router-dom";

import fs from "fs";
import Markdown from "@/components/Markdown";

const Guide = () => {
  const content = useLoaderData() as string;

  return (
    <div>
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default Guide;

export const loader = async ({ params }: any) => {
  const { folder, id } = params;

  const guides = import.meta.glob("/src/../config/guides/**/*.md", {
    as: "raw",
    eager: true,
  });

  const guidesData = Object.entries(guides).map(([path, content]) => {
    const name = path.split("/").pop()!.split(".")[0];
    const folder = path.split("/").slice(0, -1).pop()!;

    return {
      name,
      folder,
      content,
    };
  });

  const guide = guidesData.find((guide) => {
    return guide.folder === folder && guide.name === id;
  });

  return guide?.content || "# Not found";
};

export const getStaticPaths = async () => {
  // find all folders in data/guide
  // find all files in each folder
  // return array of paths

  const guides = import.meta.glob("/src/../config/guides/**/*.md", {
    as: "raw",
    eager: true,
  });

  const guidesData = Object.entries(guides).map(([path, content]) => {
    const name = path.split("/").pop()!.split(".")[0];
    const folder = path.split("/").slice(0, -1).pop()!;

    return {
      name,
      folder,
      content,
    };
  });

  const guidesByFolder = guidesData.reduce(
    (acc, guide) => {
      const folder = guide.folder;
      const guideList = acc[folder] || [];
      return {
        ...acc,
        [folder]: [...guideList, guide],
      };
    },
    {} as Record<string, typeof guidesData>
  );

  const paths = Object.entries(guidesByFolder).flatMap(([folder, guides]) => {
    return guides.map((guide) => {
      return `/guide/${folder}/${guide.name}`;
    });
  });

  return paths;
};
