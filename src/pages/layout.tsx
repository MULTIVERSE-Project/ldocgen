import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LinkGroup from "@/consts/navigation/LinkGroup";
import { processRawData } from "@/data/processing";
import { GithubIcon, SunIcon } from "lucide-react";
import { Outlet, useLoaderData } from "react-router-dom";

import LDocGenConfig from "../../ldocgen.config.json";

const Layout = ({}) => {
  const modules = processRawData();
  const { guides } = useLoaderData() as {
    guides: Record<string, { name: string; folder: string; content: string }[]>;
  };

  // sort modules by kind
  const modulesByKind = modules.reduce(
    (acc, module) => {
      const kind = module.type;
      const moduleList = acc[kind] || [];
      return {
        ...acc,
        [kind]: [...moduleList, module],
      };
    },
    {} as Record<string, typeof modules>
  );

  return (
    <main className="min-h-screen bg-background">
      {/* TOP Navigation */}
      <div className="sticky z-50 backdrop-blur top-0 border-b">
        <div className="container w-full py-5 flex justify-between items-stretch">
          <div className="text-2xl font-bold flex items-center gap-2">
            <div className="h-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 164 164"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Logo">
                  <path
                    id="bl"
                    d="M41.3086 163.526L0.891062 123.108L0.891063 70.4818C3.59416 76.0703 7.18896 81.2549 11.7091 85.7751L78.0668 152.133C69.0742 159.51 57.9057 163.526 46.1203 163.526L45.7558 163.526L41.3086 163.526Z"
                  />
                  <path
                    id="tl"
                    d="M0.891018 41.3085L0.891018 45.7557L0.891018 46.1203C0.891018 57.9057 4.90361 69.0742 12.2811 78.0667L78.6388 11.709C83.1617 7.18892 88.3436 3.59413 93.9348 0.891033L41.3085 0.891035L0.891018 41.3085Z"
                  />
                  <path
                    id="tr"
                    d="M163.526 41.3085L123.108 0.891048H118.661H118.296C106.511 0.891048 95.3425 4.90644 86.3499 12.2839L152.708 78.6416C157.228 83.1617 160.823 88.3464 163.526 93.9348V41.3085Z"
                  />
                  <path
                    id="br"
                    d="M152.133 86.3499L85.7751 152.708C81.255 157.228 76.0731 160.823 70.4818 163.526L123.108 163.526L163.526 123.108L163.526 118.661L163.526 118.296C163.526 106.511 159.513 95.3425 152.133 86.3499Z"
                  />
                </g>
              </svg>
            </div>
            {LDocGenConfig.projectName}
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-5">
              <p>docs</p>
              <p>guides</p>
            </div>
            <div className="w-px h-3/4 bg-border" />
            <div className="flex gap-2">
              <Button variant={"ghost"} size={"icon"}>
                <SunIcon size={24} />
              </Button>
              <Button variant={"ghost"} size={"icon"} asChild>
                <a href="https://github.com/" target="_blank">
                  <GithubIcon size={24} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main conteiner */}
      <div className="container relative">
        {/* Side navigation */}
        <div className="border-r block fixed z-20 top-[81px] bottom-0 right-auto w-[19rem] pt-8 pb-10 pr-6 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Searchbar */}
            <div className="">
              <Input
                placeholder={"Search"}
                className="outline-none focus-visible:ring-transparent focus-visible:border-blue-500"
              />
            </div>
            {/* Guides */}
            {Object.entries(guides).map(([folder, guides]) => {
              return (
                <LinkGroup
                  key={folder}
                  title={(folder[0].toUpperCase() + folder.slice(1)).replace(
                    /-|_/g,
                    " "
                  )}
                  links={guides.map((guide) => ({
                    title: guide.name.replace(/-|_/g, " "),
                    href: `/guides/${guide.folder}/${guide.name}`,
                  }))}
                />
              );
            })}

            {/* LDoc Stuff */}
            {Object.entries(modulesByKind).map(([kind, modules]) => {
              const title = kind[0].toUpperCase() + kind.slice(1).toLowerCase();

              return (
                <LinkGroup
                  key={kind}
                  title={title}
                  links={modules.map((module) => ({
                    title: module.name,
                    href: `/docs/${module.name}`,
                  }))}
                />
              );
            })}
          </div>
          {LDocGenConfig.showGeneratedBy && (
            <div className="mt-5">
              <p className="text-sm text-zinc-500">
                Generated by{" "}
                <a
                  href="#"
                  className="underline underline-offset-2 decoration-dashed hover:text-zinc-900"
                >
                  LDocGen
                </a>
              </p>
            </div>
          )}
        </div>
        {/* Content block */}
        <div className="ml-[19rem] py-8 px-10">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export const loader = async () => {
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

  return { guides: guidesByFolder };
};

export default Layout;
