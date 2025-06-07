import {NavLink} from "react-router"

export default function LinkPrimary({to, children}: { to: string, children?: any }) {

  return <NavLink to={to} className={`inline-flex items-center justify-center gap-x-2 px-2 py-1 text-white bg-yellow-600 hover:bg-yellow-500 rounded`}>
    <span className="size-4 button-loader hidden"></span>
    {children}
  </NavLink>;
}
