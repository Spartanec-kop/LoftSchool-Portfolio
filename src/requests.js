import axios from 'axios'

const baseUrl = "https://webdev-api.loftschool.com/";
axios.defaults.baseURL = baseUrl;

export default axios;