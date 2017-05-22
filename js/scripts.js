
// OBJECTIVES
// 1. Make an AJAX request when the user submits the form
	// 1.b. Get the users input
// 2. When the AJAX has a response/JSON, check to see if there was any valid data
// 3.If there is, load u the table with the data

$(document).ready(()=>{
	$('.yahoo-finance-form').submit((event)=>{
		// prevent the browser from submitting the form, JS will handle everything
		event.preventDefault();
		// Get whatever the user typed and stash it in a var
			// remember input boxes have no innerhtml only values
		var symbol = $('#symbol').val();
		var url = `http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`

		$.getJSON(url,(pickMeAWeiner)=>{

		});

	});
});