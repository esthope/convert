import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Template from 'component/Template.tsx';
import HomeScreen from 'screen/HomeScreen.tsx';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template/>}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
