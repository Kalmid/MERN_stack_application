import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PDFList = () => {
    const [pdfs, setPDFs] = useState([]);

    useEffect(() => {
        const fetchPDFs = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            };

            const res = await axios.get('http://localhost:5000/api/pdfs', config);
            setPDFs(res.data);
        };

        fetchPDFs();
    }, []);

    return (
        <div>
            <h2>Uploaded PDFs</h2>
            <ul>
                {pdfs.map((pdf) => (
                    <li key={pdf._id}>
                        <Link to={`/pdf/${pdf._id}`}>{pdf.filename}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PDFList;
