import Axios from 'axios';

const  api = Axios.create({ baseURL: 'https://appiotaback2.herokuapp.com/api' });
//const api = Axios.create({ baseURL: 'http://localhost:3001/api' });

export default api;