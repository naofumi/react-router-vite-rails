import { Form, useNavigate } from "react-router";
import type { Route } from "../../../.react-router/types/app/routes/sessions/+types/new";
import { baseApiPath } from "~/utilities/proxy";
import { getCSRFToken } from "~/utilities/csrf";
import { useEffect } from "react";
import Main from "~/components/Main";
import CommandBar from "~/components/CommandBar";
import ButtonPrimary from "~/components/ButtonPrimary";
import Input from "~/components/Input";
import Label from "~/components/Label";
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"
import {useAuthStore} from "~/models/authStore"

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
      const data = await res.json();
      return { data, error: null };
    } else {
      const error: { error: string } = await res.json();
      return { ...error, data: null };
    }
  } catch (error) {
    throw error;
  }
}

export default function SessionsCreate({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const error = actionData?.error || "";
  const { resetMe } = useAuthStore();

  useEffect(() => {
    if (actionData?.data) {
      resetMe();
      navigate("/posts");
    }
  }, [actionData?.data]);

  return (
    <Main title="Login">
      <TechnologySwitchToErb url="/sessions/new" />
      <div className="my-4 mx-auto max-w-sm">
        <Form method="post">
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
