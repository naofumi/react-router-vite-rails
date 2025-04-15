export default function TechnologySwitchToErb({url}: { url: string }) {
  return (
    <a href={url} className="rounded-md bg-red-500 text-white text-lg flex justify-center items-center fixed top-1 right-2 hover:opacity-60 px-2 py-1">Switch to ERB</a>
  )
}
