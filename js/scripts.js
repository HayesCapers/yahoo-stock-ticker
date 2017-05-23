// LAB
// 1.Give the user the ability to search for multiple symbols
// 2. Multiple will bring back array inside of quote. a single will bring back a single

// OBJECTIVES
// 1. Make an AJAX request when the user submits the form
	// 1.b. Get the users input
// 2. When the AJAX has a response/JSON, check to see if there was any valid data
// 3.If there is, load u the table with the data

$(document).ready(()=>{

	var tempSave = ''
	// console.log(localStorage.getItem('latSymbolSearched'))

	$('#arrow1').click(()=>{
		$('#page-1,#page-2').css({
			'right': '100vw'
		})
	})

	$('#arrow2').click(()=>{
		$('#page-1,#page-2').css({
			'right': '0vw'
		})
	})

	var userStockSavedIfAny = localStorage.getItem('lastSymbolSearched');
	if (userStockSavedIfAny !== null){
		findData(userStockSavedIfAny);
	}

	$('#save').click(()=>{
		storeData('lastSymbolSearched',tempSave)
	})

	$('.yahoo-finance-form').submit((event)=>{
		// prevent the browser from submitting the form, JS will handle everything
		event.preventDefault();
		symbol = $('#symbol').val();
		tempSave = tempStoreData(tempSave,symbol);
		console.log(tempSave);
		findData(symbol);
		$('#symbol').val('');
	});

	function findData(symbol){
		var symbolArray = [];
		if (symbol.indexOf(',') !== -1){
			symbolArray = symbol.split(',');
		}else{
			symbolArray = symbol;
		}

		var url = `http://query.yahooapis.com/v1/public/yql?q=env%20%27store://datatables.org/alltableswithkeys%27;select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbolArray}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`
		// Store in local storage (new version cookies) that will alst even after the browser closes
		// localStorage.setItem('latSymbolSearched', symbol)
		
		
		$.getJSON(url,(pickMeAWeiner)=>{
			var stockInfo = pickMeAWeiner.query.results.quote;
			if (symbol.indexOf(',') !== -1){
				for (let i = 0; i < stockInfo.length; i++){
					buildHTML(stockInfo[i]);
				}
			}else{
				buildHTML(stockInfo);
			}
		});
	}

	function buildHTML(data){	
	var newHTML = '';

	if(data.Ask == null){
		data.Ask = 'Not available';
	}
	if (data.Change.indexOf('+') > -1){
		var classChange = 'success';
	}else{
		var classChange = 'danger';
	}
	newHTML += '<tr>';
		newHTML += `<td>${data.Symbol}</td>`;
		newHTML += `<td>${data.Name}</td>`;
		newHTML += `<td>${data.Ask}</td>`;
		newHTML += `<td>${data.Bid}</td>`;
		newHTML += `<td class='bg-${classChange}'>${data.Change}</td>`;
	newHTML += '</tr>';
	$('#stock-ticker-body').append(newHTML);
	}

	function storeData(last,data){
		var old = localStorage.getItem(last);
		if (old == null){
			old = '';
			localStorage.setItem(last, data);
		}else{
			localStorage.setItem(last, old +','+ data);
		}
	}

	function tempStoreData(last,data){
		if (last == ''){
			last = data;
		}else{
			last = last +','+ data;
		}
		return last;
		console.log(last);
	}	

});

































