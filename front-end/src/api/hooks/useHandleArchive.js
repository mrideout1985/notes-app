import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../stores/authstore';
const useHandleArchiveNotes = (mutate) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const jwtToken = useUserStore((state) => state.currentUser?.token);
    const handleArchiveNotes = async (id, archive) => {
        try {
            const response = await axios.patch(`http://localhost:3000/articles/${archive ? 'add-to' : 'remove-from'}-archive/${id}    `, {
                archived: archive,
            }, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                mutate();
                return response.data;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    };
    return { handleArchiveNotes, loading, error };
};
export default useHandleArchiveNotes;
