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

// Get user category
const getCategory = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get(API_URL, config)

	return response.data
}

// Delete user goal
const deleteCategory = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.delete(API_URL + goalId, config)

	return response.data
}

const categoryService = { createCategory, getCategory, deleteCategory }

export default categoryService
