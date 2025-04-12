import {Outlet} from 'react-router';
import Nav from '../components/Nav';
import TechnologyBanner from "~/components/TechnologyBanner"

export default function DefaultLayout() {

  return <>
    <TechnologyBanner />
    <Nav />
    <Outlet />
  </>;
}
