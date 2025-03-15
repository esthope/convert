import {memo} from 'react';

const ErrorRefreshButton = () => {
	return (
		<button onClick={()=>window.location.reload()}>Rafraichir</button>
	)
}

export default memo(ErrorRefreshButton)