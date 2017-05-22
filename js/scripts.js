// LAB
// 1.Give the user the ability to search for multiple symbols
// 2. Multiple will bring back array inside of quote. a single will bring back a single

// OBJECTIVES
// 1. Make an AJAX request when the user submits the form
	// 1.b. Get the users input
// 2. When the AJAX has a response/JSON, check to see if there was any valid data
// 3.If there is, load u the table with the data

$(document).ready(()=>{

	var userStockSavedIfAny = localStorage.getItem('latSymbolSearched');
	console.log(userStockSavedIfAny)

	$('.yahoo-finance-form').submit((event)=>{
		// prevent the browser from submitting the form, JS will handle everything
		event.preventDefault();
		// Get whatever the user typed and stash it in a var
			// remember input boxes have no innerhtml only values
		var symbol = $('#symbol').val();
		var symbolArray = [];
		if (symbol.indexOf(',') !== -1){
			symbolArray = symbol.split(',');
		}else{
			symbolArray = symbol
		}

		var url = `http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbolArray}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`
		// Store in local storage (new version cookies) that will alst even after the browser closes
		localStorage.setItem('latSymbolSearched', symbol)
		
		$.getJSON(url,(pickMeAWeiner)=>{
			var stockInfo = pickMeAWeiner.query.results.quote;
			console.log(stockInfo)
			if (symbol.indexOf(',') !== -1){
				for (let i = 0; i < stockInfo.length; i++){
					buildHTML(stockInfo[i]);
				}
			}else{
				buildHTML(stockInfo);
			}
		});

		function buildHTML(data){	
			var newHTML = '';
			newHTML += '<tr>';
				newHTML += `<td>${data.Symbol}</td>`;
				newHTML += `<td>${data.Name}</td>`;
				newHTML += `<td>${data.Ask}</td>`;
				newHTML += `<td>${data.Bid}</td>`;
				newHTML += `<td>${data.Change}</td>`;
			newHTML += '</tr>';
			$('#stock-ticker-body').append(newHTML);
		}
		// example of how JS is asnycronous
		// console.log('Im the last line... but im not last because JS is async')
	});
});