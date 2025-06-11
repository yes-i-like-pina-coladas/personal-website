import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0F1C]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
