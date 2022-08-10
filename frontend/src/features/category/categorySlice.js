import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import categoryService from "./categoryService"

const initialState = {
	categories: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

// Create new category
export const createCategory = createAsyncThunk(
	"categories/create",
	async (goalData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await categoryService.createGoal(goalData, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Get goal categories
export const getCategories = createAsyncThunk(
	"categories/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await categoryService.getCategory(token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Delete goal category
export const deleteCategory = createAsyncThunk(
	"categories/delete",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await categoryService.deleteCategory(id, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const categorieSlice = createSlice({
	name: "categorie",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createCategory.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals.push(action.payload)
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getCategories.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals = action.payload
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload.id
				)
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = categorieSlice.actions
export default categorieSlice.reducer
