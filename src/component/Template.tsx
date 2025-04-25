// main
import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from 'react-router-dom';
import {ReactElement} from "react";
// util
// element
import {ErrorPage} from 'component/ErrorComponents';
import './style/template.scss';

const Template = ():ReactElement => {
	return (
	<>
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