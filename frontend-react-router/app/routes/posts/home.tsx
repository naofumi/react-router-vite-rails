import type {Route} from "../../../.react-router/types/app/routes/posts/+types/home"
import {Link, useOutletContext} from "react-router"
import {baseApiPath} from "~/utilities/proxy"
import type {DefaultLayoutContext} from "~/layouts/default"
import { useContext } from "react"
import { useAuth } from "~/components/AuthProvider"

export async function clientLoader({params}: Route.ClientLoaderArgs) {
  const res = await fetch(`${baseApiPath()}/posts`, {
      method: 'GET',
      headers: {"Accept": "application/json"}
    }
  )
  const posts: Post[] = await res.json()

  return {posts}
}

export default function PostsHome({loaderData}: Route.ComponentProps) {
  const {currentUser} = useAuth()
  const {posts} = loaderData

  return <main className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-600 sm:text-5xl">
        Posts
      </h1>
      <div className="my-4 flex justify-end">
        {currentUser
          ? <Link to={`/posts/new`} className="mt-8 text-white bg-yellow-600 p-1 rounded">
            New Post
          </Link>
          : <Link to={`/sessions/new`} className="px-2 py-1 mt-8 text-white bg-yellow-600 rounded">
            Login to create New Post
          </Link>
        }
      </div>
      <table className="w-full mt-12">
        <thead>
        <tr className="border-b-2 border-gray-400">
          <th className="p-1 border-gray-400">ID</th>
          <th>Title</th>
        </tr>
        </thead>
        <tbody>
        {posts.map(post => <tr key={post.id} className="border-b border-gray-400">
          <td className="p-1 border-gray-400 py-2">
            {post.id}
          </td>
          <td className="p-1 text-left py-2">
            {post.content}
          </td>
        </tr>)}
        </tbody>
      </table>
    </div>
  </main>;
}
