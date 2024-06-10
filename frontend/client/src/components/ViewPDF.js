import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

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

            const res = await axios.get(`http://localhost:5000/api/pdfs/${id}`, config);
            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            setPDF(fileURL);
        };

        fetchPDF();
    }, [id]);

    return (
        <div>
            <h2>View PDF</h2>
            {pdf && (
                <Document file={pdf}>
                    <Page pageNumber={1} />
                </Document>
            )}
        </div>
    );
};

export default ViewPDF;
