//need to add create and update burger options
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {
	$(document).on("click", ".devoured", function (event) {
		console.log($(this));
		let id = $(this).data("id");
		// Send the PUT request.
		$.ajax("/api/burgers/" + id, {
			type: "PUT",
			data: {
				devoured: true,
			},
		}).then(function () {
			console.log("changed devour to devoured");
			// Reload the page to get the updated list
			location.reload();
		});
	});

	$(".create-form").on("submit", function (event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();
		console.log($(this).data());

		let newBurger = {
			burger_name: $("#bu").val().trim(),
			devoured: false,
		};

		// Send the POST request.
		$.ajax("/api/burgers", {
			type: "POST",
			data: newBurger,
		}).then(() => {
			console.log("created new burger");
			// Reload the page to get the updated list
			location.reload();
		});
	});

	$(".delete-burger").on("click", function (event) {
		console.log($(this).data());
		let id = $(this).data("id");

		// Send the DELETE request.
		$.ajax("/api/burgers/" + id, {
			type: "DELETE",
		}).then(function () {
			console.log("deleted burger", id);
			// Reload the page to get the updated list
			location.reload();
		});
	});
});
