import { ReactNode } from 'react';

interface AuthCardProps {
  stepLabel?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthCard({
  stepLabel,
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <section className="grid min-h-screen place-items-center bg-white px-6 py-12 sm:px-8">
      <div className="w-full max-w-[520px]">
        {stepLabel && (
          <span className="inline-flex text-xs font-bold uppercase tracking-[0.12em] text-[#7658ff]">
            {stepLabel}
          </span>
        )}
        <h2 className="font-serif text-[46px] leading-[1.05] tracking-[-0.035em] mt-[14px] mb-[14px]">
          {title}
        </h2>
        <p className="text-[#69748a] leading-[1.7]">
          {description}
        </p>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </section>
  );
}
