import {Link} from "react-router"

export default function SwitchLoadingModes({url,label}: { url: string, label: string }) {
  return (
    <Link to={url} className="rounded-md border border-blue-500 text-blue-500 text-lg flex justify-center items-center absolute top-1 right-32 hover:opacity-60 px-2 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>&nbsp;
      {label}
    </Link>
  )
}
