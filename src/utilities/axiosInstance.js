import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:
    'https://bank.gov.ua/NBUStatService/v1/statdirectory',
})

export default axiosInstance
