import { Form, Link, NavLink } from "react-router";
import { useAuth } from "~/components/AuthProvider";
import LinkPrimary from "~/components/LinkPrimary"
import ButtonPrimary from "~/components/ButtonPrimary"
import {useEffect} from "react"

export default function Nav() {
  const { me } = useAuth();

  return (
    <>
      <nav className="top-nav flex items-center justify-between px-4 py-2 border-b-2 border-gray-200">
        <Link to="/" className="text-xl hover:opacity-60">
          <div className="leading-0">
            <span className="text-blue-600">React Router</span>
            <span className="text-sm"> & </span>
            <span className="text-red-600">Rails</span>
          </div>
          <div className="leading-0">
            <span className="text-sm"> integration example </span>
          </div>
        </Link>
        <div>
          <NavLink
            to="/posts"
            className="top-nav__navlink text-xl text-gray-600 hover:text-yellow-600 mr-2"
          >
            Posts
          </NavLink>
          <a
            href="/posts"
            className="top-nav__navlink text-xl text-gray-600 hover:text-yellow-600 mr-2"
          >
            ERB
          </a>
          <NavLink
            to="/privates"
            className="top-nav__navlink text-xl text-gray-600 hover:text-yellow-600"
          >
            Private
          </NavLink>
        </div>
        <div>
          {me ? (
            <div className="flex flex-col items-end">
              <div className="font-bold text-xs">{me.email}</div>
              <Form
                action={`sessions/${me.id}`}
                method="DELETE"
                className="inline"
              >
                <ButtonPrimary
                  type="submit"
                >
                  <div className="font-bold">Logout</div>
                </ButtonPrimary>
              </Form>
            </div>
          ) : (
            <div>
              <LinkPrimary
                to={`/sessions/new`}
              >
                <span className="text-bold">Login</span>
              </LinkPrimary>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
