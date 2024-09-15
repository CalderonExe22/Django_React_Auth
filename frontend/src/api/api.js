import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', //replace with your BaseURL 
})


api.interceptors.request.use(
    config =>{
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    async error =>{
        const originalRequest = error.config
        if ( error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            try {
                // Intenta refrescar el token
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await api.post('/token/refresh/', { refresh: refreshToken });

                    // Actualiza el access token en localStorage
                    const { access } = response.data;
                    localStorage.setItem('accessToken', access);

                    // Actualiza el encabezado de la solicitud original con el nuevo access token
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;

                    // Reintenta la solicitud original con el nuevo token
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.log('Error refreshing token', refreshError)
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;