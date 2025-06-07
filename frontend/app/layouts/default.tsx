import {data, Outlet} from 'react-router';
import Nav from '../components/Nav';
import TechnologyBanner from "~/components/TechnologyBanner"
import type {Route} from "../../.react-router/types/app/layouts/+types/default";
import {baseApiPath} from "~/utilities/proxy"
import {z} from "zod/v4"
import {defaultGetHeaders} from "~/utilities/fetch"
import {Suspense} from "react"

const apiSchema = z.strictObject({
  currentUser: z.strictObject({
    id: z.number(),
    email: z.string(),
  }).nullable(),
  featureFlags: z.strictObject({
    resetDataFeature: z.boolean(),
  }),
  theme: z.string(),
  locale: z.string(),
  environment: z.string(),
})


export async function clientLoader() {
  const contextRes = await fetch(`${baseApiPath()}/context`, {
      method: 'GET',
      headers: defaultGetHeaders
    }
  )
  if(!contextRes.ok) {
    throw data(contextRes.statusText, {status: contextRes.status})
  }
  const json = await contextRes.json()

  return {context: apiSchema.parse(json)}
}

export default function DefaultLayout({loaderData}: Route.ComponentProps) {
  const {context} = loaderData

  return <>
    <TechnologyBanner />
    <Nav currentUser={context.currentUser} />
    <Outlet />
  </>;
}
