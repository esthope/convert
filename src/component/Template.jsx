// import './template.scss';
import { Outlet } from 'react-router-dom';

const Template = () => {
	return (
		<div className="main-content">
			template
            <Outlet />
		</div>
	)
};
export default Template;