import {Form, redirect, useNavigate} from "react-router"
import type {Route} from "../../../.react-router/types/app/routes/sessions/+types/new"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"
import { useAuth } from "~/components/AuthProvider";
import { useEffect } from "react";

export async function clientAction({request}: Route.ClientActionArgs) {
  const formData = await request.formData()
  const email = formData.get('email') as string | null
  const clear_password = formData.get('clear_password')

  try {
    const res = await fetch(`${baseApiPath()}/sessions`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({email, clear_password})
      }
    )
    if (res.ok) {
      const data = await res.json()
      return {data, error: null}
    } else {
      const error: { error: string } = await res.json()
      return {...error, data: null}
    }
  } catch (error) {
    throw error
  }
}

export default function SessionsCreate({actionData}: Route.ComponentProps) {
  const navigate = useNavigate();
  const error = actionData?.error || ""
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    if (actionData?.data) {
      setCurrentUser(actionData.data)
      navigate("/posts")
    }
  }, [actionData?.data])

  return (
    <main className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center max-w-72">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-600 sm:text-5xl">
          Login
        </h1>

        <div className="my-4">
          <Form method="post">
            <div className="my-8">
              <label htmlFor="email" className="my-2 block text-sm font-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="xxx@yyy.com"
                className="p-1 border border-gray-400 rounded w-full"
              />
            </div>
            <div>
              <label
                htmlFor="clear_password"
                className="my-2 block text-sm font-bold"
              >
                Clear Password
              </label>
              <input
                type="password"
                id="clear_password"
                name="clear_password"
                placeholder="password..."
                autoComplete="current-password"
                className="p-1 border border-gray-400 rounded w-full"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="cursor-pointer text-white font-bold bg-yellow-600 px-2 py-1 rounded"
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
