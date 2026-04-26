import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Works from './pages/Works/Works';
import WorkDetail from './pages/WorkDetail/WorkDetail';
import Navbar from './pages/shared/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
