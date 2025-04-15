import {Outlet} from 'react-router';
import Nav from '../components/Nav';
import TechnologyBanner from "~/components/TechnologyBanner"
import {useAuthStore} from "~/models/authStore"
import type {Route} from "../../.react-router/types/app/layouts/+types/default";

export async function clientLoader() {
  const me = await useAuthStore.getState().fetchMe()

  return {me}
}

export default function DefaultLayout({loaderData}: Route.ComponentProps) {
  // To work around Development server issues where
  // clientLoader is not called for some unknown reason.
  // const {me} = true || process.env.NODE_ENV === "development"
  //   ? {me: useAuthStore.getState().me}
  //   : loaderData
  const {me} = loaderData

  return <>
    <TechnologyBanner />
    <Nav me={me} />
    <Outlet context={me} />
  </>;
}
