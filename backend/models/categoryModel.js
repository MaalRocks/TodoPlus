const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, "Please add a name"],
		},
		points: {
			type: Number,
			require: [true, "Please add a point value"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Category", categorySchema);
