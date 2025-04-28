import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Template from 'component/Template';
import HomeScreen from 'screen/HomeScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template/>}>
          <Route index element={<HomeScreen/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;