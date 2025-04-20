import type { ReactNode } from "react";

export default function Main({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <main className="px-6 py-12 sm:px-6 sm:py-16 lg:px-8 relative">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-semibold tracking-tight text-balance text-gray-600 text-5xl">
          {title}
        </h1>
        {subtitle && <div className="text-xl mt-4">{subtitle}</div>}
        {children}
      </div>
    </main>
  );
}
