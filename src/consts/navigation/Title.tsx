import { FC } from "react";

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <h5 className="font-semibold text-slate-900 dark:text-slate-200">
      {title}
    </h5>
  );
};

export default Title;
