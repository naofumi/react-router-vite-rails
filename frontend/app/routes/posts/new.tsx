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
import {z} from "zod"

/*
* The server response to `/posts/new` determines whether the user can see this page.
*
* If an unauthenticated user accesses this page, the server will return a 401 response.
* The clientLoader will then throw an error which will be handled at
* the error boundary at `react-router-vite-rails/frontend/app/root.tsx`.
*
* This keeps authorization logic on the server.
*
* A common alternative solution is to check the presence of the currentUser in `useApplicationContext()`.
* However, this is authorization logic.
* It should not be evaluated on the client.
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
               placeholder="Content"
               required={true}
               autoComplete="off"
        />
        <CommandBar>
          <span></span>
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
        </CommandBar>
      </Form>
    </div>
  </Main>
}
