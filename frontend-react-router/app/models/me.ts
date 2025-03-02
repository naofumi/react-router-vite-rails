import {baseApiPath} from "~/utilities/proxy"

type Me = {
  id: number,
  email: string,
}

let meIsLoaded = false

// Request /me only for the initial app load.
// Later requests will use the cached value in the AuthContext.
export async function getMeUnlessLoaded() {
  if (meIsLoaded) {
    return null
  } else {
    const data = await getMe()
    meIsLoaded = true
    return data
  }
}

async function getMe() {
  try {
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
  } catch (error) {
    console.error(error);
    return null
  }
}
