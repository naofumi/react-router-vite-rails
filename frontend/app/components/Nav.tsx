import { Form, Link, NavLink } from "react-router";
import LinkPrimary from "~/components/LinkPrimary"
import ButtonPrimary from "~/components/ButtonPrimary"

export default function Nav({ currentUser }: { currentUser: { id: number, email: string } | null}) {

  return (
    <>
      <nav className="top-nav flex justify-between items-center px-4 py-2 border-b-2 border-gray-200">
        <Link to="/" className="text-xl hover:opacity-60 w-44">
          <div className="leading-0 flex-initial">
            <span className="text-blue-600">React Router</span>
            <span className="text-sm"> & </span>
            <span className="text-red-600">Rails</span>
          </div>
          <div className="leading-0">
            <span className="text-sm"> integration example </span>
          </div>
        </Link>

        <div className="text-center flex-auto">
          <NavLink to="/posts" className="text-lg aria-[current=page]:text-yellow-600">
            Posts
          </NavLink>
          <NavLink to="/private" className="ml-2 text-lg aria-[current=page]:text-yellow-600">
            Private
          </NavLink>
        </div>

        <div className="text-right flex-initial w-44">
          {currentUser ? (
            <div className="flex flex-col items-end">
              <div className="font-bold text-xs">{currentUser.email}</div>
              <Form
                action={`sessions/${currentUser.id}`}
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
