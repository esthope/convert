// main
import {ReactElement} from 'react';
import {FallbackProps} from 'react-error-boundary';
import * as CustomMsg from 'constant/Messages';
// elements
import errorIcon from "assets/error.svg"
import warnIcon from "assets/warn.svg"
import orangeIcon from "assets/orange.svg"
import convertIcon from "assets/zeste.svg"

const Unavailable = ({error, resetErrorBoundary}:FallbackProps):ReactElement => {
	return (
		<>
		<header id="header-content" className="ml-3 index-1 flex"> 
    		<img src={orangeIcon} alt="Logo du site en erreur" />
			<h1>Zeste</h1>
		</header>

	    <main id="error-page" className="m-0 flex no-overflow">
	    	<img src={convertIcon} alt="Logo alerte avertissement" />
	    	<img src={warnIcon} alt="Logo du site Zeste" />

	    	<div className="error-message flex no-wrap">
					<img src={errorIcon} alt="Logo erreur" />

					<div className="self-center index-1">
						<p>{CustomMsg.TECH_ERR}.</p>
						<p>{CustomMsg.REFRESH} ou {CustomMsg.LATTER}.</p>
						<p>{CustomMsg.DEV}.</p>
						<a href="/" className="block mt-08">{CustomMsg.REFRESH_PAGE}</a>
					</div>
	    	</div>
	    </main>
		</>
	)
}

export default Unavailable;