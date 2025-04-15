import type {Route} from "../../../.react-router/types/app/routes/sessions/+types/delete"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"
import {redirect} from "react-router"
import {useAuthStore} from "~/models/authStore"

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
      useAuthStore.getState().resetMe()
    }
    return redirect("/")
  }
}
