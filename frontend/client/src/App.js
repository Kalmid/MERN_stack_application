import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPDF from './components/UploadPDF';
import PDFList from './components/PDFList';
import ViewPDF from './components/ViewPDF';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PDFList />} />
        <Route path="/upload" element={<UploadPDF />} />
        <Route path="/pdf/:id" element={<ViewPDF />} />
      </Routes>
    </Router>
  );
}

export default App;
