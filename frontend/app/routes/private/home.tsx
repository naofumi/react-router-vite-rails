import Main from "~/components/Main"
import type {Route} from "../../../.react-router/types/app/routes/private/+types/home"
import LinkPrimary from "~/components/LinkPrimary"

export async function clientLoader({params}: Pick<Route.ClientLoaderArgs, "params">) {
  return null
}

export default function PrivateHome() {
  return <Main title="Loader-based Authorization" subtitle="with loader-based authorization">
    <p className="text-xl mt-8">
      Click the following link to go to a private page.<br />
      If you are logged in, you will see the page.<br />
      Otherwise, you will see an error page.<br />

    </p>
    <p className="text-xl mt-4">
      This page is protected at the loader level.
    </p>
    <div className="mt-8">
      <LinkPrimary to={`/private/private`}>Go to Private Page</LinkPrimary>
    </div>
  </Main>
}
