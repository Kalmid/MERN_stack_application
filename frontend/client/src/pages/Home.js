import React from 'react';
import PDFList from '../components/PDFList';
import UploadPDF from '../components/UploadPDF';

const Home = () => {
    return (
        <div>
            <UploadPDF />
            <PDFList />
        </div>
    );
};

export default Home;
