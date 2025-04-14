// main
import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from 'react-router-dom';
import {ReactElement} from "react";
// util
// element
import {ErrorPage} from 'component/ErrorComponents';
import logo from 'assets/convert.svg';
import './style/template.scss';

const Template = ():ReactElement => {
	return (
	<>
		<header>
      		<img src={logo} className="convert_logo" alt="logo" />
		</header>
    	<ErrorBoundary FallbackComponent={ErrorPage}>
			<Outlet />
    	</ErrorBoundary>
        <footer className="self-end">
        	<div/>
        </footer>
	</>
	)
}

export default Template;