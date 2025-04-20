import { Link } from "react-router";
import type { ReactNode } from "react";

export default function LinkOutline({
  to,
  children,
}: {
  to: string;
  children?: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="px-2 py-1 bg-white border text-yellow-600 hover:text-yellow-500 rounded"
    >
      {children}
    </Link>
  );
}
