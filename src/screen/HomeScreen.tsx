import {useState} from 'react';
import SquareContainer from '../component/SquareContainer.tsx';
import {franckRemplacer} from '../util/caseHandler.tsx';
import circle from 'assets/circle.svg' ;

const Home = ():ReactElement => {

  const [areaValue, setAreaValue] = useState<string>(''),
        [choice, setChoice] = useState<string>(''),
        [selected, setSelected] = useState<string>('');

  // ref.current.focus

  return (
    <main>
      <SquareContainer areaValue={areaValue} setAreaValue={setAreaValue} />

      <div className="flex">
        <input type="text" value={choice} />
        <button type="button" className="flex-center" onClick={()=>franckRemplacer(areaValue, choice, selected)}>
            <img src={circle} className="replace_icon" alt="logo" />
        </button>
      </div>

      <textarea
        name="story"
        rows="20"
        cols="100"
        value={areaValue}
        onChange={({target})=>{setAreaValue(target.value)}} />
    </main>
  )
};
export default Home;