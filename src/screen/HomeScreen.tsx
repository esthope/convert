import SquareButton from '../component/SquareButton.tsx';
import logo from '../logo.svg';

const changeCase = (): void => {
  console.log('test')
}

const Home = () => {
  return (
    <main>
      <SquareButton action="TEST" text="Test Case" onClick={changeCase} />

      <textarea name="story" rows="20" cols="100">
      It was a dark and stormy night...
      </textarea>

      {/*<img src={logo} className="App-logo" alt="logo" />*/}
    </main>)
};
export default Home;