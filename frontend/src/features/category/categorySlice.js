import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import categoryService from "./categoryService"

const initialState = {
	categories: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

// Create new categorie
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
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals = action.payload
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals = state.goals.filter(
					(goal) => goal._id !== action.payload.id
				)
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
