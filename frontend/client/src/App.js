
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PDFViewer from './pages/PDFViewer';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pdf/:id" element={<PDFViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
