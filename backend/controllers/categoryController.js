const asyncHandler = require("express-async-handler")

const Category = require("../models/categoryModel")

// Eine auswahl an Kategorien erstellen die dann
// im Dropdown als auswahloption erscheint
// Geschier spülen = 20
// Saugen = 20
// einkaufen = 30
// müll raus bringen = 10

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

module.exports = registerCategory
