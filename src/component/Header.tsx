import {ReactElement, useEffect, useState, useRef, memo} from "react";
import {isMobile} from 'react-device-detect';
import convert_logo from 'assets/zeste.svg';

const Header = ({started}:{started:boolean}):ReactElement => {

	const [displayed, setDisplayed] = useState<boolean>(true),
		  keepRef = useRef<any>(false),
		  delayRef = useRef<any>(0);

	/**
	 * Hide the introductionafter 15 seconds
	 */
	const trigger_hiding_intro = ():void => {
		keepRef.current = false;

		delayRef.current = setTimeout(():void=>{
		clearInterval(delayRef.current)
			if (!keepRef.current) {setDisplayed(false)}
		}, 15000)
	}

	/**
	 * Hide the introductionafter when the user started writing
	 */
	useEffect(()=>{
		if (!isMobile && started)
		{
			setDisplayed(false)
		}
	}, [started])

	return (
		<header className="mb-5">
			<div id="header-content" className="flex fit-content"
			{...( !isMobile && started && displayed
				? {
					onMouseEnter: ()=>{keepRef.current = true},
					onMouseLeave: ()=>{trigger_hiding_intro()}
				} : {}
			)}>
	      		<img src={convert_logo}
	      		className="ml-3 pointer"
	      		alt="Logo du site Zeste"
	      		{...( !isMobile && started
					? {
						onMouseEnter: ()=>{setDisplayed(true)},
					} : {}
				)}
	      		/>

	      		<h1 className="mobile-title">Zeste</h1>
	      		<div className={`intro fade-element left ${(displayed) ? 'fade-animation':''}`}
	      		>
	      			<h1 className="mb-1 desktop-title">Zeste</h1>
		      		<p><b>Bienvenue sur Zeste</b>, cet outil permet de convertir les majuscules et minusules <b>– la casse –</b> du texte, et de remplacer plusieurs lettres par d'autres en un seul coup.</p>
		      		<p>Remplacer en masse le texte souhaité grâce à la sélection multiple. La sélection sera bleue en <span className="normal">sélection normale</span> et ocre en <span className="multi">sélection multiple</span> !</p>
		      	</div>
			</div>
		</header>
	)
}
const HeaderMemo = memo(Header);
export default HeaderMemo;