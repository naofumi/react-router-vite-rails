import {Outlet} from 'react-router';
import Nav from '../components/Nav';
import type {Route} from "../../.react-router/types/app/layouts/+types/default";
import {getMeUnlessLoaded} from "~/models/me"
import {useAuth} from "~/components/AuthProvider"
import { useEffect } from 'react';

export type User = {
  id: number,
  email: string
}

export async function clientLoader() {
  const loadedMe = await getMeUnlessLoaded()
  return {loadedMe}
}

export default function DefaultLayout({loaderData}: Route.ComponentProps ) {
  const {setCurrentUser} = useAuth()
  const {loadedMe} = loaderData

  useEffect(() => {
    if (loadedMe) {
      setCurrentUser(loadedMe)
    }
  }, [loadedMe, setCurrentUser])

  return <>
    <Nav />
    <Outlet />
  </>;
}
