import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Template from 'component/Template';
import HomeScreen from 'screen/HomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/zeste" element={<Template/>}>
          <Route path="/zeste" element={<HomeScreen/>} />
          {/*<Route path="*" element={<Navigate to="/" />} />*/}
        </Route>
      </Routes>
    </Router>
  )
}

export default App;