import axios from 'axios';
export const createNote = async (data, token, email) => {
    const response = await axios.post('http://localhost:3000/articles', {
        title: data.title,
        description: data.description,
        authorEmail: email,
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
    return response;
};
export const updateNote = async (data, token, email, id) => {
    try {
        const response = await axios.patch(`http://localhost:3000/articles/${id}`, {
            title: data.title,
            description: data.description,
            authorEmail: email,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
export const deleteNote = async (id, token) => {
    const response = axios.delete(`http://localhost:3000/articles/${id}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
    return await response;
};
