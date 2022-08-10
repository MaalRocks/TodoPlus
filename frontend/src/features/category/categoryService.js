import axios from "axios"

const API_URL = "/api/categories/"

// Create new category
const createCategory = async (categoryData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(API_URL, categoryData, config)

	return response.data
}

const categoryService = createCategory

export default categoryService
