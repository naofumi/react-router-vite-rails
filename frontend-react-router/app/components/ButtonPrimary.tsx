import {Link} from "react-router"
import type {ReactNode} from "react"

type ButtonTypes = "button" | "submit" | "reset"

export default function ButtonPrimary({
  type = "button",
  children,
}: {
  type?: ButtonTypes;
  children?: ReactNode;
}) {
  return (
    <button
      type={type}
      className="px-2 py-1 text-white bg-yellow-600 hover:bg-yellow-500 rounded"
    >
      {children}
    </button>
  );
}
