import {data, Form, redirect, useNavigation} from "react-router";
import type {Route} from "../../../.react-router/types/app/routes/sessions/+types/new";
import {baseApiPath} from "~/utilities/proxy";
import Main from "~/components/Main";
import CommandBar from "~/components/CommandBar";
import ButtonPrimary from "~/components/ButtonPrimary";
import Input from "~/components/Input";
import Label from "~/components/Label";
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"
import {z} from "zod"
import {defaultGetHeaders, defaultPostHeaders} from "~/utilities/fetch"
import {useEffect, useState} from "react"

const apiSchema = z.strictObject({
  isAlreadyAuthenticated: z.boolean(),
})

const apiErrorSchema = z.strictObject({
  error: z.string(),
})

/*
* We always ask the server to check user authentication status.
* We do not rely on the `currentUser` inside `useApplicationContext()`.
*
* This approach avoids writing authorization logic in the client.
* */
export async function clientLoader() {

  const res = await fetch(`${baseApiPath()}/sessions/new`, {
    method: "GET",
    headers: defaultGetHeaders,
  });
  if (!res.ok) {
    throw data(res.statusText, {status: res.status});
  }
  const json = await res.json();
  const validatedJson = apiSchema.parse(json);

  if (validatedJson.isAlreadyAuthenticated) {
    return redirect("/posts");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email")
  const clear_password = formData.get("clear_password")

  try {
    const res = await fetch(`${baseApiPath()}/sessions`, {
      method: "POST",
      headers: defaultPostHeaders,
      body: JSON.stringify({ email, clear_password }),
    });
    if (res.ok) {
      return redirect("/posts")
    } else {
      return apiErrorSchema.parse(await res.json());
    }
  } catch (error) {
    throw error;
  }
}

export default function SessionsCreate({ actionData }: Route.ComponentProps) {
  const error = actionData?.error || "";
  const [busy, setBusy] = useState(false);
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === "idle") {
      setBusy(false)
    }
  }, [navigation])

  return (
    <Main title="Login">
      <TechnologySwitchToErb url="/sessions/new" />
      <div className="my-4 mx-auto max-w-sm">
        <Form method="post" onSubmit={async (e) => {setBusy(true)}}>
          {error && <div className="text-red-500">{error}</div>}
          <div className="my-8">
            <Label htmlFor="email">
              Email (sazae@example.com)
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="xxx@yyy.com"
              required={true}
            />
          </div>
          <div>
            <Label htmlFor="clear_password">Password (hogehoge)</Label>
            <Input
              type="password"
              id="clear_password"
              name="clear_password"
              placeholder="password..."
              autoComplete="current-password"
              required={true}
            />
          </div>
          <div className="mt-8">
            <CommandBar>
              <span></span>
              <ButtonPrimary type="submit">
                {busy && <span className="size-4 button-loader"></span>}
                <span className="font-bold px-4">Login</span>
              </ButtonPrimary>
              <span></span>
            </CommandBar>
          </div>
        </Form>
      </div>
    </Main>
  );
}
