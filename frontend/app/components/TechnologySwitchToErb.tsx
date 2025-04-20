export default function TechnologySwitchToErb({url}: { url: string }) {
  return (
    <a href={url} className="rounded-md bg-red-500 text-white text-lg flex justify-center items-center absolute top-1 right-2 hover:opacity-60 px-2 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>&nbsp;
      to ERB
    </a>
  )
}
