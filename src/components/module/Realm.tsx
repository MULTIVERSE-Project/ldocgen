import { cn } from "@/lib/utils";
import { FC } from "react";

const REALMS = {
  server: "bg-[#08f]",
  client: "bg-[#f80]",
  shared: "bg-gradient-to-br from-[#f80] from-50% to-[#08f] to-50%",
} as const;

interface RealmProps {
  realm: keyof typeof REALMS;
}

const Realm: FC<RealmProps> = ({ realm }) => {
  return (
    <div
      className={cn("inline-block w-5 h-5 rounded-md mr-2", REALMS[realm])}
    />
  );
};

export default Realm;
