import {Outlet} from 'react-router';
import Nav from '../components/Nav';

export default function DefaultLayout() {

  return <>
    <Nav />
    <Outlet />
  </>;
}
