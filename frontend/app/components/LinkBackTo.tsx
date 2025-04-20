import {Link} from "react-router"
import type {ReactNode} from "react"

export default function LinkOutline({to, children}: {to: string, children?: ReactNode}) {
  return <Link to={to} className="pr-2 py-1 bg-white border text-yellow-600 hover:text-yellow-500 rounded">
    <div className="flex align-middle">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <div>{children}</div>
    </div>
  </Link>;
}
