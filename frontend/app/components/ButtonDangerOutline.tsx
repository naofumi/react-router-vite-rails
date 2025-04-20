import {Link} from "react-router"
import type {ReactNode} from "react"

type ButtonTypes = "button" | "submit" | "reset"

export default function ButtonDangerOutline({
  type = "button",
  children,
}: {
  type?: ButtonTypes;
  children?: ReactNode;
}) {
  return (
    <button
      type={type}
      className="px-2 py-1 text-red-600 border border-red-600 hover:border-red-500 rounded cursor-pointer"
    >
      {children}
    </button>
  );
}
