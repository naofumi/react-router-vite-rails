import {useRouteLoaderData} from "react-router"
import type {clientLoader} from "~/layouts/default"

export function useApplicationContext() {
  const loaderData = useRouteLoaderData<Awaited<ReturnType<typeof clientLoader>>>("layouts/default")

  return {context: loaderData?.context}
}
