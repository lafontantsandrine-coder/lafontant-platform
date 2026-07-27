import { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-7xl px-6 lg:px-8",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}