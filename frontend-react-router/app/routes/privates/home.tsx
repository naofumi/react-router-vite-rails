import {useAuth} from "~/components/AuthProvider"

export default function PrivatesHome() {
  const { currentUser } = useAuth()

  if (!currentUser) return <div>Please login</div>

  return <>
    <div className="text-5xl">Privates Home</div>
  </>
}
