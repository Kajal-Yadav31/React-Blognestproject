import { jwtDecode } from 'jwt-decode';

function useUserData() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
        const token = refreshToken;
        const decoded = jwtDecode(token);
        return decoded;
    }

    return null;
}

export default useUserData;