import {Form, redirect, useNavigate, useOutletContext} from "react-router"
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
import {useEffect} from "react"
import type {Me} from "~/models/me"

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

  await res.json()
  return redirect("/posts")
}

export default function PostNew({actionData}: Route.ComponentProps) {
  const {me} = useOutletContext<{me: Me | null}>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!me) {
      navigate("/sessions/new")
    }
  }, [me, navigate])

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
