var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
	burger.selectAll((data) => {
		let hbsObject = {
			burgers: data,
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/api/burgers", (req, res) => {
	burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, false], (result) => {
		// Send back the ID of the new quote
		res.json({ id: result.insertId });
	});
});

//route to update
router.put("/api/burgers/:id", (req, res) => {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.updateOne(
		{
			devoured: true,
		},
		condition,
		(result) => {
			if (result.changedRows == 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		}
	);
});

router.delete("/api/burgers/:id", (req, res) => {
	var condition = "id = " + req.params.id;

	burger.deleteOne(condition, (result) => {
		if (result.affectedRows == 0) {
			// If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

// Export routes for server.js to use.
module.exports = router;
