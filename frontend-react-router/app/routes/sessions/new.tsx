import {Form, redirect} from "react-router";
import type {Route} from "../../../.react-router/types/app/routes/sessions/+types/new";
import {baseApiPath} from "~/utilities/proxy";
import {getCSRFToken} from "~/utilities/csrf";
import Main from "~/components/Main";
import CommandBar from "~/components/CommandBar";
import ButtonPrimary from "~/components/ButtonPrimary";
import Input from "~/components/Input";
import Label from "~/components/Label";
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"
import {useAuthStore} from "~/models/authStore"

export async function clientLoader() {
  // We authenticate in the loader to prevent flickering.
  // Since `/user/me` is called in the layout loader too,
  // we will be sending two requests to `/user/me` at the same time.
  //
  // We could ensure that only one request to `/user/me` is sent if we
  // call `useAuthStore().me` in the layout, since the loader for layout is
  // guaranteed to have been completed.
  // However, calling `navigate()` must happen in a useEffect, and so this
  // will create flickering of the login page before redirecting to the
  // posts' page.
  //
  // Here we prioritize preventing flickering.
  // Deduplicating requests may be preventable with Tanstack Query.
  const me = await useAuthStore.getState().fetchMe();
  if (me) {
    return redirect("/posts");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const clear_password = formData.get("clear_password");

  try {
    const res = await fetch(`${baseApiPath()}/sessions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": getCSRFToken(),
      },
      body: JSON.stringify({ email, clear_password }),
    });
    if (res.ok) {
      // We reset the authStore, which causes a request to /users/me to be sent
      // the next time layouts/default.tsx is rendered.
      // useAuthStore is set then.
      useAuthStore.getState().resetMe();
      return redirect("/posts")
    } else {
      const error: { error: string } = await res.json();
      return { ...error, data: null };
    }
  } catch (error) {
    throw error;
  }
}

export default function SessionsCreate({ actionData }: Route.ComponentProps) {
  const error = actionData?.error || "";

  return (
    <Main title="Login">
      <TechnologySwitchToErb url="/sessions/new" />
      <div className="my-4 mx-auto max-w-sm">
        <Form method="post">
          {error && <div className="text-red-500">{error}</div>}
          <div className="my-8">
            <Label htmlFor="email">
              Email (sazae@example.com)
            </Label>
            <Input
              type="text"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="xxx@yyy.com"
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
            />
          </div>
          <div className="mt-8">
            <CommandBar>
              <span></span>
              <ButtonPrimary type="submit">
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
