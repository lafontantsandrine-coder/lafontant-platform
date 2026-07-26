import { ReactNode } from 'react';

interface SocialButtonsProps {
  dividerText?: string;
  children?: ReactNode;
}

export default function SocialButtons({
  dividerText = 'o',
  children,
}: SocialButtonsProps) {
  return (
    <div>
      {/* Divider */}
      <div className="flex items-center gap-3 my-6 text-[#98a2b4] text-xs">
        <div className="h-px flex-1 bg-[#e4e9f1]" />
        <span>{dividerText}</span>
        <div className="h-px flex-1 bg-[#e4e9f1]" />
      </div>

      {/* Social buttons */}
      <div className="flex flex-col gap-[10px]">
        {children}
      </div>
    </div>
  );
}
