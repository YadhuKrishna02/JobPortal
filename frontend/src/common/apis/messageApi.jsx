import axios from 'axios';

export const messageApi = axios.create({
  baseURL: 'https://jobzen.online/api/message',
});

// myAxios.interceptors.request.use(
//   (config) => {
//     const state = localStorage.getItem('reduxState');
//     const reduxState = JSON.parse(state);
//     // console.log(reduxState, 'stsssss');
//     const token = reduxState?.recruiters?.recruiters?.token;
//     config.headers['Authorization'] = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );
