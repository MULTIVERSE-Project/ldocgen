import { FC } from "react";
import Title from "./Title";
import Link from "./Link";

interface LinkGroupProps {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

const LinkGroup: FC<LinkGroupProps> = ({ title, links }) => {
  return (
    <div>
      <Title title={title} />

      <div className="flex flex-col gap-1 mt-2 box-border border-l border-gray-400/40">
        {links.map((link) => (
          <Link key={`${link.title}-${link.href}`} {...link} />
        ))}
      </div>
    </div>
  );
};

export default LinkGroup;
