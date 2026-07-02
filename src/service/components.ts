import axios from "axios"

export const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || "http://localhost:5000/api"

export const componentService = {
    async getAllCategories() {
        const res = await axios.get(`${API_URL}/components/categories`)
        return res.data?.data || res.data
    },
    async getOptionsByCategoryId(id: string) {
        const res = await axios.get(`${API_URL}/components/${id}/options`)
        return res.data?.data || res.data
    },
    async getAllTheme() {
        const res = await axios.get(`${API_URL}/components/themes`)
        return res.data?.data || res.data
    },
    async getAllGame() {
        const res = await axios.get(`${API_URL}/components/games`)
        return res.data?.data || res.data
    }
}