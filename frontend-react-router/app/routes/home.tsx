import {Link} from "react-router";
import type {Route} from "./+types/home";
import TechnologyBanner from "~/components/TechnologyBanner"

export function meta({}: Route.MetaArgs) {
  return [
    {title: "New React Router App"},
    {name: "description", content: "Welcome to React Router!"},
  ];
}

export default function Home() {
  return <Welcome/>;
}

export function Welcome() {
  return <>
    <TechnologyBanner />
    <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-blue-600 sm:text-5xl">
          React Router SPA/Framework mode
        </h2>
        <div className="my-4 text-3xl text-gray-500">&</div>
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-red-600 sm:text-5xl">
          Ruby on Rails
        </h2>
        <div className="my-10 flex items-center justify-center gap-x-6">
          <Link to="/posts"
                className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
            See the Demo
          </Link>
          <a href="https://github.com/naofumi/react-router-vite-rails" className="text-sm/6 font-semibold text-gray-900" target="_blank">
            See the code on GitHub <span
            aria-hidden="true">→</span>
          </a>
        </div>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          On February 14th, 2025, the React team <a
          href="https://react.dev/blog/2025/02/14/sunsetting-create-react-app" className="underline text-yellow-600"
          target="_blank">announced</a> the official deprecation of Create React App (CRA).
          They recommend that instead, developers should use a framework that builds single-page
          apps (SPA)
          that can be deployed to a CDN or a static hosting service – SPA frameworks.
        </p>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          However, ever since the Webpacker days, the most common way of integrating a React app with Ruby on Rails
          was to load a React JavaScript bundle onto an ERB template using the <code
          className="bg-amber-100 rounded px-1">javascript_include_tag</code> (jsbunding or sprockets)
          or the <code className="bg-amber-100 rounded px-1">javascript_pack_tag</code> (webpacker).
          This approach uses React as a library, and unfortunately, <strong>this is not compatible with SPA
          frameworks</strong> which integrate the inital HTML template as part of their package and
          include all sorts of tags inside it.
        </p>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          This example application and the associated GitHub repository propose a new, minimal way to
          integrate React apps with Ruby on Rails.
          This approach is compatible with SPA frameworks, enabling us to enjoy all the benefits
          of the new integrated React SPA experience.
        </p>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          As more and more developers are experiencing SSR fatigue,
          leaving full-stack JavaScript SSR frameworks and coming back to the
          simpler and cheaper SPAs, we must be careful not to just go back to the SPAs of our memories,
          forgetting that the kerfuffle of package dependencies, state management and data-fetch waterfalls
          was anything but simple.
          We must also remind ourselves that contrary to the promise of a smooth, app-like user experience,
          SPAs were often ridiculed for their <a href="https://williamkennedy.ninja/javascript/2022/05/03/in-defence-of-the-single-page-application/" className="underline text-yellow-600" target="_blank">
          disappointing real world performance</a>.
        </p>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          Instead we must take advantage of our learnings from the past few years which are
          embodied in the recommended SPA frameworks.
          The technologies are much better and more sensible now, and I hope that the approach describe here will allow
          us to build React SPAs in a modern
          and enjoyable way.
        </p>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          Of course, my true belief is that we would all be better off by just using Hotwire.
          That is where I believe Nirvana lies, and I hope to discuss this separately.
        </p>
      </div>
    </div>
  </>
}
