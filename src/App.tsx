import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Template from 'component/Template';
import HomeScreen from 'screen/HomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template/>}>
          <Route path="/" element={<HomeScreen/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;