// main
import {ReactNode, ReactElement, useEffect} from 'react';
import {FallbackProps} from 'react-error-boundary';
// util
import * as CustomMsg from 'constant/Messages';
import {get_boundary_error} from 'util/errorHandler';
import ErrorRefreshButton from 'component/ErrorRefreshButton';
// component
import CaseButton from './CaseButton';
import ActionButton from './ActionButton';
import SkullIncon from "assets/skull.svg"

const ErrorPage = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {
	console.log(error)
	return (
      <main>
		<p className="border m-0">{CustomMsg.TECH_ERR}.<br/>{CustomMsg.REFRESH}ou{CustomMsg.LATTER}.<br/>{CustomMsg.DEV}.</p>
		<ErrorRefreshButton />
      </main>
	)
}

const CaseError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	const errorFaces = [':(',"--'",'):']

	return (
		<section className="caseContainer flex">
		{
			errorFaces.map((face:string, index:number)=>
			<CaseButton
				key={`errButton-${index}`}
				className="grey-background unactiveButton"
				content={face}
				disabled
				className="caseButtonBase grey-background unactiveButton flex-center"
				> 
				<span>{face}</span>
			</button>
			)
		}
		</section>
	)
}

const ActionError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {
	return (
		<section className="actionContainer flex">
			{
				[...Array(3)].map((_, index)=>
				<ActionButton
					key={`errButton-${index}`}
					entry='skull'
					label="Icône d'erreur. Le bouton ne peut pas fonctionner."
					/>

				)
			}
		</section>
	)
}

const EditorError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	return (
   		<section id="editor-container">
   			<div className="editor quicksand-font green-background">
   				<span>ERR</span>
   			</div>
   		</section>
	)
}

export {ErrorPage, CaseError, ActionError, EditorError};

{/**/}