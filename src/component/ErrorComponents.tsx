import {ReactNode, ReactElement, useEffect} from 'react';
import {FallbackProps} from 'react-error-boundary';
import CaseButton from './CaseButton';
import ActionButton from 'component/ActionButton';

const ErrorPage = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	return (
		<p className="border m-0">error {error.toString()}</p>
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
				/>
			)
		}
		</section>
	)
}

const ActionError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	return (
		<p className="border m-0">action {error.toString()}</p>
	)
}

const EditorError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	return (
		<p className="border m-0">action {error.toString()}</p>
	)
}

export {ErrorPage, CaseError, ActionError, EditorError};

{/*<ActionButton
	entry='skull'
	label="Icône d'erreur. Le bouton ne peut pas fonctionner."
	/>*/}