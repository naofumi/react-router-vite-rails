import Main from "~/components/Main"
import {useOutletContext} from "react-router"
import type {LayoutClientLoaderReturnType} from "~/layouts/default"

// Instead of authorizing inside a clientLoader, we authorize inside the page component.
// This works because the layout clientLoader fetches `/users/me` before rendering starts,
// and we can directly use the result to render different pages.
// This means flickering does not happen.
//
// We could do authorization inside a clientLoader,
// but we would need to fetch `/users/me` twice since we also send the same
// request in the layout clientLoader.
// We could prevent this with deduping with Tanstack Query.
export default function PrivatesHome() {
  const {me} = useOutletContext<LayoutClientLoaderReturnType>()

  if (!me) return <Main title="Private access denied!">
    <div className="my-4 mx-auto max-w-md">
      <p>Unauthorized users cannot access this page.</p>
      <p>Please login</p>
    </div>
  </Main>

  return <Main title="Privates access success!">
    <div className="my-4 mx-auto max-w-md">
      <p>The content here is only visible to logged in users.</p>
      <p>Try to access this page after logging out.</p>
    </div>
  </Main>
}
