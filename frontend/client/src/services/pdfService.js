import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pdfs';

const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    };
    const response = await axios.post(API_URL, formData, config);
    return response.data;
};

const getPDFs = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const viewPDF = async (id) => {
    const config = {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    };
    const response = await axios.get(`${API_URL}/${id}`, config);
    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    return fileURL;
};

export { uploadPDF, getPDFs, viewPDF };
