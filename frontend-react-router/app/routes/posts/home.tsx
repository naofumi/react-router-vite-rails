import type {Route} from "../../../.react-router/types/app/routes/posts/+types/home"
import {Form, Link, type MetaFunction} from "react-router"
import {baseApiPath} from "~/utilities/proxy"
import {useAuth} from "~/components/AuthProvider"
import Main from "~/components/Main"
import CommandBar from "~/components/CommandBar"
import ButtonDangerOutline from "~/components/ButtonDangerOutline"
import { NewPostButton } from "./components/NewPostButton"

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  const res = await fetch(`${baseApiPath()}/posts`, {
      method: 'GET',
      headers: {"Accept": "application/json"}
    }
  )
  const posts: Post[] = await res.json()

  return {posts}
}

export function meta() {
  return [
    {title: "Posts"}
  ];
}

export default function PostsHome({loaderData}: Route.ComponentProps) {
  const {me} = useAuth()
  const {posts} = loaderData

  return (
    <Main title="Posts">
      <div className="mt-8">
        <CommandBar>
          <Form action="/fixtures" method="post">
            <ButtonDangerOutline type="submit">Reset Data</ButtonDangerOutline>
          </Form>
          <NewPostButton me={me} />
        </CommandBar>
      </div>
      <table className="w-full mt-12">
        <thead>
          <tr className="border-b-2 border-gray-400">
            <th className="p-1 border-gray-400">ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-400">
              <td className="p-1 border-gray-400 py-2">{post.id}</td>
              <td className="p-1 text-left py-2">{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
}
