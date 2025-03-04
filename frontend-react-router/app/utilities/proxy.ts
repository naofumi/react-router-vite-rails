/*
* In this example application, the Ruby on Rails APIs endpoints are like
* `GET /posts` or `GET /users` and do not have any prefixes like `/api*`.
*
* However, during development, the port for the Vite development server (typically 5173) is different from
* the Rails development server (typically 3000).
* This means that the Vite server needs to distinguish
* between the requests it should send to the Rails server on port 3000 (JSON API requests) and the
* ones that it should handle itself on port 5173 (e.g., the Vite assets).
*
* Therefore, when running on the Vite development server, we prefix
* requests intended for the Rails API server with "/api" to tell Vite to send them
* to port 3000.
* See the `proxy:` section in `frontend-react-router/vite.config.ts` for
* the Vite side of this configuration.
*
* Using this function, you would write a request to the Rails API as follows.
*
*   fetch(`${baseApiPath()}/posts`, {
*       headers: { "Accept": "application/json" }
*     }).then(...)....
*
* Note that if your API server's endpoints are like `/api/posts`,
* then you can write like the following, without the `baseApiPath()` function.
*
*   fetch(`/api/posts`, {
*       headers: { "Accept": "application/json" }
*     }).then(...)....
*
* * */
export function baseApiPath() {
  if (import.meta.env.MODE === 'development') {
    return '/api'
  } else {
    return ''
  }
}
