const asyncHandler = require("express-async-handler")

const Category = require("../models/categoryModel")

// Eine auswahl an Kategorien erstellen die dann
// im Dropdown als auswahloption erscheint
// Geschier spülen = 20
// Saugen = 20
// einkaufen = 30
// müll raus bringen = 10

// @desc    Get categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ goal: req.goal.id })

	res.status(200).json(categories)
})

// @desc    Set categories
// @route   Set /api/categories
// @access  Private
const setCategories = asyncHandler(async (req, res) => {
	//check for response
	if (!req.body.text) {
		res.status(400)
		throw new Error("Please add something in the text field")
	}

	//if response true
	const category = await Category.create({
		text: req.body.text,
		goal: req.goal.id,
		points: req.body.points,
	})

	res.status(200).json(category)
})

// @desc    Put categories
// @route   Put /api/categories
// @access  Private
const updateCategorie = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id)

	if (!category) {
		res.status(400)
		throw new Error("category not found")
	}

	// Check for user
	if (!req.user) {
		res.status(401)
		throw new Error("User not found")
	}

	// Make s
})

const registerCategory = asyncHandler(async (req, res) => {
	const { name, score } = req.body

	if (!name || !points) {
		res.status(400)
		throw new Error("Please add all fields")
	}

	// Check if category exists
	const categoryExists = await Category.findOne({ name })

	if (categoryExists) {
		res.status(400)
		throw new Error("Category already exists")
	}

	// Create category
	const category = await Category.create({
		name,
		score,
	})
})

module.exports = { getCategories, setCategories, registerCategory }
