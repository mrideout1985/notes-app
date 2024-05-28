import useSWR from 'swr';
import useUserStore from '../../stores/authstore';
const fetcher = ({ token }) => async (url) => {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
};
const useGetArchivedUserNotes = ({ email, sortBy }) => {
    const user = useUserStore();
    const fetcherWithToken = fetcher({ token: user.currentUser?.token });
    const { data, error, isLoading, isValidating, mutate } = useSWR(`http://localhost:3000/articles/my-archived-articles/?email=${email}&sortBy=${sortBy}`, fetcherWithToken);
    return {
        notes: data,
        isLoading,
        isValidating,
        mutate,
        error,
    };
};
export default useGetArchivedUserNotes;
