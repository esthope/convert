import './style/template.scss';
import { Outlet } from 'react-router-dom';
import prov_logo from 'assets/circle.svg';

const Template = () => {
	return (
	<>
		<header>
      		<img src={prov_logo} className="convert_logo" alt="logo" />
		</header>
		<Outlet />
        <footer>
        	<div/>
        </footer>
	</>
	)
}
export default Template;