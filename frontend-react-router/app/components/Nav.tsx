import { Form, Link, NavLink } from "react-router";
import { useAuth } from "~/components/AuthProvider";

export default function Nav() {
  const { currentUser } = useAuth();

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
          <NavLink
            to="/privates"
            className="top-nav__navlink text-xl text-gray-600 hover:text-yellow-600"
          >
            Private
          </NavLink>
        </div>
        <div>
          {currentUser ? (
            <div className="flex flex-col items-end">
              <div className="font-bold text-xs">{currentUser.email}</div>
              <Form
                action={`sessions/${currentUser.id}`}
                method="DELETE"
                className="inline"
              >
                <button
                  type="submit"
                  className="py-1 px-2 text-white font-bold rounded bg-yellow-600 cursor-pointer hover:bg-yellow-500"
                >
                  Logout
                </button>
              </Form>
            </div>
          ) : (
            <div>
              <Link
                to={`/sessions/new`}
                className="font-bold text-white p-2 rounded bg-yellow-600 hover:bg-yellow-500"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
