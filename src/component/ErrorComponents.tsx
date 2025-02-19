// main
import {ReactNode, ReactElement, useEffect} from 'react';
import {FallbackProps} from 'react-error-boundary';
// util
import * as CustomMsg from 'constant/Messages';
import {get_boundary_error} from 'util/errorHandler';
import ErrorRefreshButton from 'component/ErrorRefreshButton';
// component
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
			<button
				key={`errButton-${index}`}
				type="button"
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
				<button
					key={`errButton-${index}`}
					type="button"
					disabled
					className="actionButton flex-center column no-bg no-border"
					> 
					<img
		        	src='assets/skull.svg'
		        	alt="Icône d'erreur en forme de crâne" />
				</button>)
			}
		</section>
	)
}

const EditorError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	return (
		<p className="border m-0">action {error.toString()}</p>
	)
}

export {ErrorPage, CaseError, ActionError, EditorError};