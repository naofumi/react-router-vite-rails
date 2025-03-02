import type {Route} from "../../../.react-router/types/app/routes/posts/+types/new"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"
import {redirect} from "react-router"

export async function clientAction({request}: Route.ClientActionArgs) {
  if (request.method.toUpperCase() === 'POST') {
    const res = await fetch(`${baseApiPath()}/fixtures`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'X-CSRF-Token': getCSRFToken(),
        },
      }
    )
    if (res.ok) {
      return redirect("/posts")
    }
  }
}
