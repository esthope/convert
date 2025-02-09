// main
import {ReactElement} from "react";
import {Outlet} from 'react-router-dom';
// util
// element
import prov_logo from 'assets/circle.svg';
import './style/template.scss';

const Template = (): ReactElement => {
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