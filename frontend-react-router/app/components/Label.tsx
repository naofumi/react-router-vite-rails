import type { ReactNode } from "react";

export default function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children?: ReactNode;
}) {
  return (
    <div className="text-left mb-1">
      <label htmlFor="content" className="text-gray-600 text-sm font-bold">
        {children}
      </label>
    </div>
  );
}
