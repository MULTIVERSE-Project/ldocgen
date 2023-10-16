import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  title: string;
  href: string;
}

const Link: FC<LinkProps> = ({ href, title }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "py-1 pl-4 text-sm border-l border-transparent -ml-px",
          isActive ? "border-blue-500" : "hover:border-gray-400"
        )
      }
    >
      {title}
    </NavLink>
  );
};

export default Link;
