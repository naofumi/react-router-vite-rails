import {Outlet} from 'react-router';
import Nav from '../components/Nav';
import TechnologyBanner from "~/components/TechnologyBanner"
import {useAuthStore} from "~/models/authStore"
import type {Route} from "../../.react-router/types/app/layouts/+types/default";

export async function clientLoader() {
  const me = await useAuthStore.getState().fetch()

  return {me}
}

export type LayoutClientLoaderReturnType = Awaited<ReturnType<typeof clientLoader>>

export default function DefaultLayout({loaderData}: Route.ComponentProps) {
  const data = loaderData

  return <>
    <TechnologyBanner />
    <Nav me={data.me} />
    <Outlet context={data} />
  </>;
}
