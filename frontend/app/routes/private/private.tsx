import Main from "~/components/Main"
import {data} from "react-router"
import type {Route} from "../../../.react-router/types/app/routes/private/+types/private"
import {baseApiPath} from "~/utilities/proxy"
import {z} from "zod"
import {defaultGetHeaders} from "~/utilities/fetch"

const apiSchema = z.strictObject({
  secretInformation: z.string(),
  permissions: z.strictObject({
    canSeePrivate: z.boolean()
  })
})

export async function clientLoader() {
  const res = await fetch(`${baseApiPath()}/private/private`, {
      method: 'GET',
      headers: defaultGetHeaders
    })
  if (!res.ok) {
    throw data(res.statusText, {status: res.status})
  }
  const validatedJson = apiSchema.parse(await res.json())

  if (!validatedJson.permissions.canSeePrivate) { throw data("Forbidden", {status: 403}) }

  return validatedJson
}

export default function PrivatePrivate({loaderData}: Route.ComponentProps) {
  const {secretInformation} = loaderData

  return <Main title="Private Page" subtitle="only visible to logged in users">
    <p className="text-xl mt-8">
      This is a private page.<br />
    </p>
    <p className="text-xl mt-4">
      You should only be able to access this if you are logged in.
    </p>
    <p className="text-xl mt-4 text-red-500">
      {secretInformation}
    </p>
  </Main>
}
