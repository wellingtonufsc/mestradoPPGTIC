import Axios from 'axios';

const api = Axios.create({ baseURL: 'https://appiotaback.herokuapp.com/api' });

export default api;