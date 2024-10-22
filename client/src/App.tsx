import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthPage } from './modules/features/auth/auth';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/about" element={<p>xd</p>} />
      </Routes>
    </Router>
  )
}

export default App
