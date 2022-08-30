import axiosInstance from "../utilities/axiosInstance"
import { errorHandler } from "."

export const getCurrencies = async () => {
    const URL = '/exchangenew?json'

    try {
        const response = await axiosInstance.get(URL)
        return response.data
      } catch (error) {
        errorHandler(error)
      }
}