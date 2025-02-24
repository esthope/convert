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
		<p className="border m-0">{CustomMsg.TECH_ERR}.<br/>{CustomMsg.REFRESH} ou {CustomMsg.LATTER}.<br/>{CustomMsg.DEV}.</p>
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
				/>
			)
		}
		</section>
	)
}

const ActionError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {
	const icons = ['copy', 'past', 'cut', 'reset']
	const keys = ['C', 'V', 'X', 'Q']
	return (
		<section className="actionContainer flex">
			{
				icons.map((icon, index)=>
				<div key={`errButton-${index}`} className="no-pointer">
					<ActionButton
						entry={`${icon}_err`}
						label={icon}
						/>
					<label className='block text-center'>ctrl · {keys[index]}</label>
				</div>
				)
			}
		</section>
	)
}

const EditorError = ({error, resetErrorBoundary}:FallbackProps):ReactNode => {
	return (
   		<section id="editor-container">
   			<div className="editor quicksand-font green-background">
   				<span className="placeholder">{CustomMsg.OOPS} {CustomMsg.EDITOR}. {CustomMsg.ALERT}.</span>
   			</div>
   		</section>
	)
}

export {ErrorPage, CaseError, ActionError, EditorError}