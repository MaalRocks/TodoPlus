const asyncHandler = require("express-async-handler")

const Goal = require("../models/goalModel")

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
	// eine goals variable wird erstellt
	// die find() methode der "Model"-klasse wird aufgerufen
	// diese sucht in der db nach einem "user:"" auf den die parameter zutreffen
	// und returned es als mongoose-"Query"-object
	// als parameter wird user.id übergeben
	// dieser Wert wird aus dem http request geholt (req.user.id)
	// (req.user.id) enthält daten weil "authMiddleware.js"
	// per JWT einen datenbank abgleich macht
	const goals = await Goal.find({ user: req.user.id })

	res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400)
		throw new Error("Please add something in the text field")
	}

	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	})

	res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id)

	if (!goal) {
		res.status(400)
		throw new Error("Goal not found")
	}

	// Check for user
	if (!req.user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Make sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("User not authorized")
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})

	res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id)

	if (!goal) {
		res.status(400)
		throw new Error("Goal not found")
	}

	// Check for user
	if (!req.user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Make sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error("User not authorized")
	}

	await goal.remove()

	res.status(200).json({ id: req.params.id })
})

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
}
