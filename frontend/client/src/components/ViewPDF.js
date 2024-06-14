import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Document, Page } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { viewPDF } from '../services/pdfService';
import './ViewPDF.css';

const API_URL = 'http://localhost:5000/api/pdfs';

const ViewPDF = () => {
    const { id } = useParams();
    const [pdf, setPDF] = useState(null);

    useEffect(() => {
        const fetchPDF = async () => {
            const config = {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            };

            const res = await axios.get(`${API_URL}/${id}`, config);
            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = await viewPDF(file);
            return fileURL;
        };

        fetchPDF();
    }, [id]);

    return (
        <div className="pdf-viewer">
            <h2>View PDF</h2>
            {pdf && (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js`}>
                    <div className="pdf-container">
                        <Viewer fileUrl={pdf} />
                    </div>
                </Worker>
            )}
        </div>
    );
};

export default ViewPDF;
