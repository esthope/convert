import {useState} from 'react';
import SquareContainer from '../component/SquareContainer.tsx';
// import {franckRemplacer} from '../util/caseHandler.tsx';

const Home = ():ReactElement => {

  const [areaValue, setAreaValue] = useState<string>(),
        [selection, setSelection] = useState<string>('');

  return (
    <main>
      <SquareContainer areaValue={areaValue} setAreaValue={setAreaValue} />

      <textarea
        name="story"
        rows="20"
        cols="100"
        value={areaValue}
        onChange={({target})=>{setAreaValue(target.value)}} />
    </main>)
};
export default Home;