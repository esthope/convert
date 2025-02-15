import {ReactNode, ReactElement, useEffect} from 'react';
import {FallbackProps} from 'react-error-boundary';

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
			<button
				key={`errButton-${index}`}
				type="button"
				disabled
				className="caseButtonBase grey-background unactiveButton flex-center"
				// onMouseEnter={onMouseEnter}
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
		<p className="border m-0">action {error.toString()}</p>
	)
}

const EditorError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {

	return (
		<p className="border m-0">action {error.toString()}</p>
	)
}

export {ErrorPage, CaseError, ActionError, EditorError};