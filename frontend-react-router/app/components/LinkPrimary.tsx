import {Link} from "react-router"
import type {ReactNode} from "react"

export default function LinkPrimary({to, children}: {to: string, children?: ReactNode}) {
  return <Link to={to} className="px-2 py-1 text-white bg-yellow-600 hover:bg-yellow-500 rounded">
    {children}
  </Link>;
}
