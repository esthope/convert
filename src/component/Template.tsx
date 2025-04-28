// main
import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from 'react-router-dom';
import {ReactElement} from "react";
// element
import UnavailableScreen from 'screen/UnavailableScreen';
import linkedinLogo from 'assets/linkedin.svg';

const Template = ():ReactElement => {
	return (
	<>
    	<ErrorBoundary FallbackComponent={UnavailableScreen}>
			<Outlet />
    	</ErrorBoundary>
        <footer className="self-end index-1">
        	<div className="flex-center gap-2">
        		Réalisation par Esthope :

        		<a href="https://github.com/esthope" target="_blank" rel="noreferrer" className="">Github</a>
        		<a href="https://www.linkedin.com/in/lucile-demongeot-779a211a5" target="_blank" rel="noreferrer" className="flex-center gap-05">
        			<span>Contact</span> 
        			<img src={linkedinLogo} alt="LinkedIn"/>
        		</a>
        	</div>
        </footer>
	</>
	)
}

export default Template;