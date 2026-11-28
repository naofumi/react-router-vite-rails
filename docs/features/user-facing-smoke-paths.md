# User-facing feature paths for smoke tests

This guide maps the application’s main user journeys to their Rails and React Router entry points. Agents adding or changing user-facing behavior should keep these paths working and update the smoke specs when the journeys change.

## Application entry points

| Path | User-facing feature | Implementation |
| --- | --- | --- |
| `/` | Public introduction to the Rails and React Router demo, with a link into the posts demo and a switch to the React version of the landing page. | `StaticsController#landing_page`, `app/views/statics/landing_page.html.erb`; React landing route `frontend/app/routes/home.tsx`. |
| `/posts` | Public, server-rendered post list. A visitor can switch to its React Router counterpart. | `PostsController#index`, `app/views/posts/index.html.erb`. |
| `/react/posts` | Client-rendered post list, loaded from Rails JSON APIs. The page links back to the ERB version. | `ReactController#show` serves the SPA shell; route and loader are in `frontend/app/routes/posts/home.tsx`; data is supplied by `PostsController#index` and `app/views/posts/index.json.jbuilder`. |
| `/react/posts/new` | Authenticated React Router form for creating a post. Anonymous visitors are sent to the React login page. | `frontend/app/routes/posts/new.tsx`; authorization and creation are handled by `PostsController`. |
| `/react/sessions/new` | React Router login form. Successful login uses the Rails session cookie, so the signed-in user is available in both the SPA and ERB pages. | `frontend/app/routes/sessions/new.tsx`; `SessionsController#create` and the shared application context endpoint. |
| `/posts/new` | Authenticated ERB form for creating a post. Anonymous visitors are redirected to `/sessions/new`. | `PostsController#new` and `#create`, `app/views/posts/new.html.erb`. |
| `/sessions/new` | Server-rendered login form, using the same Rails session as the React Router experience. | `SessionsController` and `app/views/sessions/new.html.erb`. |

## Selected smoke journeys

### Browse and switch between renderers

1. Open `/` and confirm the introduction and demo link render.
2. Follow “See the Demo” to `/posts` and confirm a seeded post appears.
3. Follow “to React” to `/react/posts` and confirm the same post is visible.
4. Follow “to ERB” back to `/posts` and confirm the post remains visible.

This covers the public entry point, the Rails-rendered list, the React Router shell and loader, and the explicit cross-renderer navigation links.

### Authenticate, create a post, and share the session

1. Open `/react/posts/new` as a guest. The Rails JSON authorization response should route the browser to `/react/sessions/new`.
2. Sign in with the `sazae` test fixture (`sazae@example.com` / `hogehoge`) and confirm the React post list identifies the signed-in user.
3. Switch to `/posts`, create a post through the ERB form, and confirm it appears in the list.
4. Switch back to `/react/posts`, confirm the new post and signed-in identity are still visible, then log out and confirm the protected post route sends the visitor back to login.

This covers the login boundary, the Rails session cookie and CSRF handoff, a persisted create action, and shared authentication state across Rails and React Router.

## Running and maintaining the smoke specs

The browser specs are in `test/system/user_facing_smoke_test.rb`. They use Rails fixtures and headless Chrome. The React pages are served from the compiled SPA under `public/react`, so build them before system tests:

```sh
bin/rails react_router:preview
bin/rails test:system
```

The CI test job builds the React Router application before running the suite. Keep the smoke flows focused on successful user journeys; detailed edge cases belong in the existing controller, model, and frontend unit tests.
