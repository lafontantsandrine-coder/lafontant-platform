import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger";
}

const variantMap = {
  primary: "badge",
  success: "badge badge-success",
  warning: "badge badge-warning",
  danger: "badge badge-danger",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        variantMap[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}