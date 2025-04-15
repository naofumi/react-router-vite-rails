import {Outlet} from 'react-router';
import Nav from '../components/Nav';
import TechnologyBanner from "~/components/TechnologyBanner"
import {useAuthStore} from "~/models/authStore"

export default function DefaultLayout() {
  const {initMe} = useAuthStore();
  initMe()

  return <>
    <TechnologyBanner />
    <Nav />
    <Outlet />
  </>;
}
