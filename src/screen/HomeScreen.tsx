import {useState, useEffect} from 'react';
import {Cases} from '../constant/Cases.ts';
import SquareButton from '../component/SquareButton.tsx';
import logo from '../logo.svg';

const Home = (): ReactElement => {

  const [areaValue, setAreaValue] = useState<string>();
  const [action, setAction] = useState<string>('');

  /*
    trim
    toUpperCase
    toLowerCase

    camel case + whiteCaracter : https://www.geeksforgeeks.org/how-to-convert-string-to-camel-case-in-javascript/
   */

  const changeCase = (action:string): void => {
    if (areaValue !== "" && areaValue !== undefined) {

      if (action === Cases.low) {
        setAreaValue(areaValue.toLowerCase());
      }
    }
  }

  return (
    <main>

      <SquareButton action={Cases.low} text="Test Case" onClick={()=>{changeCase(Cases.low)}} />

      <textarea
        name="story"
        rows="20"
        cols="100"
        value={areaValue}
        onChange={({target})=>{setAreaValue(target.value)}}
      />

      {/*<img src={logo} className="App-logo" alt="logo" />*/}
    </main>)
};
export default Home;