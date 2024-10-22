import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>hi</p>} />
        <Route path="/about" element={<p>xd</p>} />
      </Routes>
    </Router>
  )
}

export default App
