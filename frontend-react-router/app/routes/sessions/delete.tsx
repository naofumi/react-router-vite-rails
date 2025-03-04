import type {Route} from "../../../.react-router/types/app/routes/sessions/+types/delete"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"
import { redirect, useNavigate } from "react-router"
import {useAuth} from "~/components/AuthProvider"
import { useEffect } from "react"

export async function clientAction({request, params}: Route.ClientActionArgs) {
  if (request.method.toUpperCase() === 'DELETE') {
    const res = await fetch(`${baseApiPath()}/sessions/${params.id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      }
    })
    if (res.ok) {
      return
    } else {
      const message = await res.json()
      return message
    }
  }
}

export default function SessionDelete({actionData}: Route.ComponentProps) {
  const {setCurrentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null)
    navigate("/")
  }, [setCurrentUser, navigate]);
}
