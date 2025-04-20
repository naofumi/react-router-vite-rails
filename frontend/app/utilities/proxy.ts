/*
* The `baseApiPath()` is useful when you are using the React Router development server
* and the JSON API endpoints on your Rails server do not have specific prefixes.
* It is not used in production or preview builds.
*
*
* In the example application, the Ruby on Rails API endpoints are like
* `GET /posts` or `GET /users` and do not have any specific prefixes like `/api*`.
*
* However, during development, the port for the React Router development server (typically 5173) is different from
* the Rails development server (typically 3000).
* This means that the React Router server needs to distinguish
* between the requests it should send to the Rails server on port 3000 (JSON API requests) and the
* ones that it should handle itself on port 5173 (e.g., the React Router assets).
*
* Therefore, when running on the React Router development server, we prefix
* requests intended for the Rails API server with "/api" to tell the development server to send them
* to port 3000.
* The all other requests will be sent to port 5173.
*
* See the `proxy:` section in `frontend/vite.config.ts` for
* the Vite side of this configuration.
*
* Using this function, you would write a request to the Rails API as follows.
*
*   fetch(`${baseApiPath()}/posts`, {
*       headers: { "Accept": "application/json" }
*     }).then(...)....
*
* Note that if your JSON API server's endpoints are like `/api/posts`,
* then you don't need the `baseApiPath()` function.
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
