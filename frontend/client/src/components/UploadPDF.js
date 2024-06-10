import React, { useState } from 'react';
import axios from 'axios';

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            };

            const res = await axios.post('http://localhost:5000/api/pdfs', formData, config);
            setMessage('File uploaded successfully');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.message);
            }
        }
    };

    return (
        <div>
            <h2>Upload PDF</h2>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <input type="file" onChange={onFileChange} />
                </div>
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </div>
    );
};

export default UploadPDF;
