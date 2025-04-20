import {data, Form, redirect, useNavigate, useOutletContext} from "react-router"
import type {Route} from "../../../.react-router/types/app/routes/posts/+types/new"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"
import Main from "~/components/Main"
import CommandBar from "~/components/CommandBar"
import ButtonPrimary from "~/components/ButtonPrimary"
import LinkBack from "~/components/LinkBackTo"
import Label from "~/components/Label"
import Input from "~/components/Input"
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"
import type {Me} from "~/models/me"

/*
* The /posts/new page does not need server data for rendering.
* On the other hand, we want to only allow authenticated users to access this page.
*
* To achieve this, it is possible to manage authorization on the client.
* However, it is generally better to handle all authorization logic on the server.
*
* Therefore, we send a request just to check whether the current user can access this page.
* The server just responds with a standard status.
* */
export async function clientLoader() {
  const res = await fetch(`${baseApiPath()}/posts/new`, {
    method: 'GET',
    headers: {"Accept": "application/json"}
  })
  if (!res.ok) {
    throw data(res.statusText, {status: res.status})
  }
}

export async function clientAction({request}: Route.ClientActionArgs) {
  const formData = await request.formData()
  const content = formData.get('content')
  const res = await fetch(`${baseApiPath()}/posts`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'X-CSRF-Token': getCSRFToken(),
      },
      body: JSON.stringify({content})
    }
  )

  return redirect("/posts")
}

export default function PostNew({actionData}: Route.ComponentProps) {
  const {me} = useOutletContext<{me: Me | null}>()
  const navigate = useNavigate()

  return <Main title="New Post">
    <TechnologySwitchToErb url="/posts/new" />
    <CommandBar>
      <LinkBack to={`/posts`}>Back</LinkBack>
    </CommandBar>

    <div className="my-4 mx-auto max-w-md">
      <Form method="post">
        <Label htmlFor="content">Post Content</Label>
        <Input type="text"
               id="content"
               name="content"
               placeholder="Content"/>
        <CommandBar>
          <span></span>
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
        </CommandBar>
      </Form>
    </div>
  </Main>
}
