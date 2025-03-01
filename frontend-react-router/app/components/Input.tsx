import type {InputHTMLAttributes} from "react"

export default function Input(props: InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} className= "p-1 border border-gray-400 rounded w-full focus-visible:outline-yellow-600" />
}
