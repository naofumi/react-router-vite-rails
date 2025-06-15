import type {Route} from "../../../.react-router/types/app/routes/posts/+types/home"
import {data, Form} from "react-router"
import {baseApiPath} from "~/utilities/proxy"
import Main from "~/components/Main"
import CommandBar from "~/components/CommandBar"
import ButtonDangerOutline from "~/components/ButtonDangerOutline"
import {NewPostButton} from "./components/NewPostButton"
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"
import SwitchLoadingModes from "~/routes/posts/components/SwitchLoadingModes"
import {useApplicationContext} from "~/layouts/useApplicationContext"
import {z} from "zod/v4"
import LinkOutline from "~/components/LinkOutline"
import {defaultGetHeaders} from "~/utilities/fetch"
import PostsTable from "./components/PostsTable"
/*
* This application uses page-oriented APIs instead of table-oriented APIs.
*
* - APIs contain all data for a single page but no more.
* - Each API serves a single page and is not intended for reuse.
* - The API should not contain any fields not displayed on the page.
*
* This reduces the number of requests, reduces client-side logic,
* and eliminates inadvertent leaking of sensitive information.
* /

/*
* We avoid defining types that mirror the DB structure like Post or Author.
* Instead, Zod on the incoming API is the single source of type information.
*
* Zod with `z.strictObject()` ensures the API does not contain extra fields.
* */
export const apiSchema = z.strictObject({
  posts: z.array(z.strictObject({
    id: z.number(),
    content: z.string(),
    author: z.strictObject({
      email: z.string(),
    }),
    highlighted: z.boolean(),
    canEditPost: z.boolean(),
    createdAt: z.iso.datetime({local: true}).transform((date) => new Date(date)),
  })),
  pagination: z.strictObject({
    prevPage: z.number().nullable(),
    nextPage: z.number().nullable()
  }),
  permissions: z.strictObject({canCreatePost: z.boolean()})
});

export async function clientLoader({request}: Pick<Route.ClientLoaderArgs, "request">) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const res = await fetch(`${baseApiPath()}/posts?${searchParams}`, {
      method: 'GET',
      headers: defaultGetHeaders
    }
  )
  if (!res.ok) {
    throw data(res.statusText, {status: res.status})
  }

  const json = await res.json()
  return apiSchema.parse(json)
}

export function meta() {
  return [
    {title: "Posts"}
  ];
}

export default function PostsHome({loaderData}: Route.ComponentProps) {
  /*
  * `useApplicationContext()` internally calls `useRouteLoaderData()`.
  * This gives us access to the loader data of the parent layout – `app/layouts/default.tsx`.
  *
  * This is essentially a semi-global state that is
  * automatically fetched, cached, and revalidated by React Router.
  * */
  const {context} = useApplicationContext()
  const {posts, permissions: {canCreatePost}, pagination: {nextPage, prevPage}} = loaderData

  return (
    <Main title="Posts" subtitle="with loader-based data loading">
      <TechnologySwitchToErb url="/posts"/>
      <SwitchLoadingModes url="/posts/classic" label="useEffect pattern"/>
      <div className="mt-8">
        <CommandBar>
          {context?.featureFlags.resetDataFeature ?
            <Form action="/fixtures" method="post">
              <ButtonDangerOutline type="submit">Reset Data</ButtonDangerOutline>
            </Form> :
            <div></div>}
          <NewPostButton canCreatePost={canCreatePost}/>
        </CommandBar>
      </div>
      <PostsTable posts={posts} />
      <CommandBar>
        {prevPage ? <LinkOutline to={`/posts?page=${prevPage}`}>Prev</LinkOutline> : <span></span>}
        {nextPage ? <LinkOutline to={`/posts?page=${nextPage}`}>Next</LinkOutline> : <span></span>}
      </CommandBar>
    </Main>
  );
}
