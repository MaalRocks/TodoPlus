const express = require("express")
const router = express.Router()
const {
	getCategies,
	setCategories,
} = require("../controllers/categoryController")

const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getCategies).post(protect, setCategories)
