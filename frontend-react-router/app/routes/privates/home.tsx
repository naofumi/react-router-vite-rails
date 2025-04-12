import {useAuth} from "~/components/AuthProvider"
import Main from "~/components/Main"

export default function PrivatesHome() {
  const { me } = useAuth()

  if (!me) return <div className="my-4 mx-auto max-w-md">
    <p>Unauthorized users cannot access this page.</p>
    <p>Please login</p>
  </div>


  return <Main title="Privates">
    <div className="my-4 mx-auto max-w-md">
      <p>The content here is only visible to logged in users.</p>
      <p>Try to access this page after logging out.</p>
    </div>
  </Main>
}
