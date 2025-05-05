// main
import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from 'react-router-dom';
import {ReactElement} from "react";
// element
import {Link} from "constant/interfaces"
import UnavailableScreen from 'screen/UnavailableScreen';
import ExternalLink from 'component/ExternalLink';


import {Links} from 'constant/Configuration'


const Template = ():ReactElement => {
	return (
	<>
    	<ErrorBoundary FallbackComponent={UnavailableScreen}>
			<Outlet />
    	</ErrorBoundary>
    	{/* pt-2*/}
        <footer className="self-end flex column align-end index-1 gap-3">
        	<div className="flex gap-5">

        		{Links.map((link:Link):any => (
	        		<ExternalLink
	        		key={link.title}
	        		text={link.text}
	        		image={link.image}
	        		link={link.link}
	        		title={link.title}
	        		/>
        		))}
        	</div>
        	<span className="rozhaone-font">Copyright © 2025 • Tous droits réservés</span>
        </footer>
	</>
	)
}

export default Template;