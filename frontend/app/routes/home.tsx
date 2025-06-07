import {NavLink} from "react-router";
import type {Route} from "./+types/home";
import TechnologyBanner from "~/components/TechnologyBanner"
import TechnologySwitchToErb from "~/components/TechnologySwitchToErb"

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
    <TechnologySwitchToErb url="/" />
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
          <NavLink to="/posts"
                className="inline-flex items-center justify-center gap-x-2 rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
            <span className="size-4 button-loader hidden"></span>
            See the Demo
          </NavLink>
          <a href="https://github.com/naofumi/react-router-vite-rails" className="text-sm/6 font-semibold text-gray-900" target="_blank">
            See the code on GitHub <span
            aria-hidden="true">→</span>
          </a>
          <a href="https://github.com/naofumi/react-router-vite-rails" className="text-sm/6 font-semibold text-gray-900" target="_blank">
          Read the blog post <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="hyphens-auto text-justify mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
          This demo application shows an example of using the
          react_router_rails_spa gem. See the README on GitHub for more details.
        </p>
      </div>
    </div>
  </>
}
