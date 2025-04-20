import {baseApiPath} from "~/utilities/proxy"

export type Me = {
  id: number,
  email: string,
}

/*
* Since we send the bootstrap HTML file from Rails controllers,
* it is feasible to attach information related to the user and their preferences
* inside a cookie that is immediately available to the browser when the
* bootstrap HTML file is received.
*
* This would allow flicker-free rendering of dark/light themes and other user
* related UI elements.
*
* However, sending personal data via cookies should be avoided since they are
* easily viewable.
* Instead, we use a `/me` endpoint and rely on the React Router loader mechanism
* to enable flicker-free rendering.
*
*
* */
export async function getMe() {
  let data
  let res = await fetch(`${baseApiPath()}/users/me`, {
    method: "GET",
    headers: {Accept: "application/json"},
  })

  if (res.status === 204) {
    // no content – no logged-in user
    return null
  } else {
    return await res.json() as Me
  }
}
