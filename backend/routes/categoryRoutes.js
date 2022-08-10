const express = require("express")
const router = express.Router()
const {
	getCategories,
	setCategories,
} = require("../controllers/categoryController")

const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getCategories).post(protect, setCategories)
