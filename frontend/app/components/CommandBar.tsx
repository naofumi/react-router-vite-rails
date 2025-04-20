import type {ReactNode} from "react"

export default function CommandBar({children}: { children?: ReactNode }) {
  return <div className="my-4 flex justify-between">
    {children}
  </div>
}
