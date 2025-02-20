// main
import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from 'react-router-dom';
import {ReactElement} from "react";
// util
// element
import {ErrorPage} from 'component/ErrorComponents';
import prov_logo from 'assets/circle.svg';
import './style/template.scss';

const Template = ():ReactElement => {
	return (
	<>
		<header>
      		<img src={prov_logo} className="convert_logo" alt="logo" />
		</header>
    	<ErrorBoundary FallbackComponent={ErrorPage}>
			<Outlet />
    	</ErrorBoundary>
        <footer>
        	<div/>
        </footer>
	</>
	)
}

export default Template;