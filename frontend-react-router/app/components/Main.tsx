import type { ReactNode } from "react";

export default function Main({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <main className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-semibold tracking-tight text-balance text-gray-600 text-5xl">
          {title}
        </h1>
        {children}
      </div>
    </main>
  );
}
