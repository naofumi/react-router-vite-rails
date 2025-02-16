/*
* # Utilities for CSRF protection.
*
* Cookie-based authentication is very convenient, well-studied and smooth to implement.
* However, care must be taken to prevent CSRF attacks.
*
* ## CSRF protection with the "Cookie to Header" approach
*
* The current application sends the CSRF token to the browser as a non-session cookie.
* This token is then sent back to the server on a later request to prove authenticity.
*
* This approach is described in the "Mitigating CSRF attacks" section of [this post](https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication),
* and also on [Wikipedia: Cookie to Header Token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token).
*
* How it works.
*
* 1. The Ruby on Rails server sends the session-specific
*    CSRF token in a Cookie named "X-CSRF-Token"
*    app/controllers/concerns/csrf_cookie_enabled.rb
* 2. Retrieve this token with the `getCSRFToken()` function
*    and use its value to send in your fetch request headers.
* 3. On receiving the request, Rails will validate that the
*    'X-CSRF-Token' header value matches what was sent via the cookie.
* 4. Note that you only need to do this for non-GET requests.
*
* Your code should look like this.
*    const res = await fetch(`${baseApiPath()}/posts`, {
*        method: 'POST',
*        headers: {
*          "Accept": "application/json",
*          "Content-Type": "application/json",
*          'X-CSRF-Token': getCSRFToken(),
*        },
*        body: JSON.stringify({content})
*      }
*    )
*
* */

export function getCSRFToken() {
  const token = document.cookie.match(/X-CSRF-Token=([^;]+)/)?.[1] || ''
  return token
}
