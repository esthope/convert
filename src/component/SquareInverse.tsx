import {ReactElement} from "react";
import inversionArrows from 'assets/inverse.svg';

const SquareInverse = (): ReactElement => {
    return (
      <div id="inversionText" className="flex-center">
        <span>A</span>
        <img src={inversionArrows} className="" alt="arrows" />
        <span>a</span>
      </div>
    )
}

export default SquareInverse;