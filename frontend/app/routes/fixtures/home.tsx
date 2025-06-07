import type {Route} from "../../../.react-router/types/app/routes/posts/+types/new"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"
import {data, redirect} from "react-router"
import {defaultPostHeaders} from "~/utilities/fetch"

export async function clientAction({request}: Route.ClientActionArgs) {
  if (request.method.toUpperCase() === 'POST') {
    const res = await fetch(`${baseApiPath()}/fixtures`, {
        method: 'POST',
        headers: defaultPostHeaders,
      }
    )
    if (!res.ok) {
      throw data(res.statusText, {status: res.status})
    }

    return redirect("/posts")
  }
}
