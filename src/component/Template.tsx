// main
import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from 'react-router-dom';
import {ReactElement} from "react";
// element
import UnavailableScreen from 'screen/UnavailableScreen';

const Template = ():ReactElement => {
	return (
	<>
    	<ErrorBoundary FallbackComponent={UnavailableScreen}>
			<Outlet />
    	</ErrorBoundary>
        <footer className="self-end">
        	<div>
        		{/*https://github.com/esthope*/}
        	</div>
        </footer>
	</>
	)
}

export default Template;