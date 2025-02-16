import {Form, Link, redirect} from "react-router"
import type {Route} from "../../../.react-router/types/app/routes/posts/+types/new"
import {baseApiPath} from "~/utilities/proxy"
import {getCSRFToken} from "~/utilities/csrf"

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

  const post: Post = await res.json()
  return post
}

export default function PostNew({actionData}: Route.ComponentProps) {
  return <main className="container my-8 mx-8">
    <h1 className="text-4xl">Posts New</h1>
    <div className="flex justify-start">
      <Link to={`/posts`} className="mt-8 bg-blue-400 p-1 rounded">Back</Link>
    </div>

    <div className="my-4">
      <Form method="post">
        <div><label htmlFor="content" className="text-sm bold">Content</label></div>
        <input type="text"
               id="content"
               name="content"
               placeholder="Content"
               className="p-1 border border-gray-400 rounded w-full"/>
        <div className="flex justify-end mt-2">
          <button type="submit" className="mt-8 bg-blue-400 p-1 rounded">Submit</button>
        </div>
      </Form>
      {actionData ? <p>{actionData.content} updated!</p> : null}
    </div>
  </main>;
}
