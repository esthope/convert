import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Template from './component/Template';
import HomeScreen from './screen/HomeScreen';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Template/>}>
            <Route path="/" element={<HomeScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
