import type {Route} from "../../../.react-router/types/app/routes/posts/+types/home"
import {Form} from "react-router"
import {baseApiPath} from "~/utilities/proxy"
import Main from "~/components/Main"
import CommandBar from "~/components/CommandBar"
import ButtonDangerOutline from "~/components/ButtonDangerOutline"
import { NewPostButton } from "./components/NewPostButton"
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"
import {useEffect, useState} from "react"
import SwitchLoadingModes from "~/routes/posts/components/SwitchLoadingModes"
import {useApplicationContext} from "~/layouts/useApplicationContext"
import {z} from "zod"

/*
* This page uses page-tailored APIs
* */
export const apiSchema = z.strictObject({
  posts: z.array(z.strictObject({
    id: z.number(),
    content: z.string(),
    url: z.string(),
    author: z.strictObject({
      email: z.string(),
    }),
    highlighted: z.boolean(),
    canEditPost: z.boolean(),
  })),
  permissions: z.strictObject({canCreatePost: z.boolean()})
});

export async function clientLoader({params}: Route.ClientLoaderArgs) { return null }

export function meta() {
  return [
    {title: "Posts"}
  ];
}

export default function PostsClassic() {
  const {context} = useApplicationContext()

  const [data, setData] = useState<z.infer<typeof apiSchema>>({posts: [], permissions: {canCreatePost: false}})
  const [error, setError] = useState<{status: number, message: string} | null>(null)

  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseApiPath()}/posts`, {
          method: 'GET',
          headers: {"Accept": "application/json"}
        }
      )
      if (!res.ok) {
        setError({status: res.status, message: res.statusText})
      }
      const json = await res.json()
      setData(apiSchema.parse(json))
    })()
  }, [])

  return (
    <Main title="Posts" subtitle="with useEffect-based data loading">
      <TechnologySwitchToErb url="/posts" />
      <SwitchLoadingModes url="/posts" label="loader pattern"/>
      <div className="mt-8">
        <CommandBar>
          {context?.featureFlags.resetDataFeature ?
            <Form action="/fixtures" method="post">
              <ButtonDangerOutline type="submit">Reset Data</ButtonDangerOutline>
            </Form> :
            <div></div>}
          <NewPostButton canCreatePost={data?.permissions.canCreatePost} />
        </CommandBar>
      </div>
      {error && <div className="text-red-500">{error.message}</div>}
      <table className="w-full mt-12">
        <thead>
          <tr className="border-b-2 border-gray-400">
            <th className="p-1 border-gray-400">ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map((post) => (
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
