function Table(headers, rows) {
	this.headers = headers;
	this.rows = rows;
	this.getTableElement = function() {
		var table = document.createElement("table");
		var currentRow = document.createElement("tr");
		table.appendChild(currentRow);
		$(this.headers).each(function() { 
			var currentCell = document.createElement("td");
			currentCell.appendChild(document.createTextNode($(this)[0]));
			currentRow.appendChild(currentCell);
		});
		
		$(this.rows).each(function() { 
			currentRow = document.createElement("tr");
			table.appendChild(currentRow);
			$(this).each(function() {
				var currentCell = document.createElement("td");
				currentCell.classList.add("span10");
				currentCell.appendChild(document.createTextNode($(this)[0]));
				currentRow.appendChild(currentCell);
			});
		});
		return table;
	}
	
	this.sortRows = function(colIndex) {
		var ind = 1;
		rows.sort(function(a,b) {
			console.log("a:" + a[ind] + "||b:" + b[ind]);
			if(a[ind] < b[ind]) {
				console.log(-1);
				return -1;
			}
			if(a[ind] > b[ind]) {
				console.log(1);
				return 1;
			}
			if(a[ind] === b[ind]) {
				console.log(-0);
				return 0;
			}
		})
	}
	
	this.sortColumn = function(headerName) {
		var index = $.inArray(headerName, headers);
		if(index === -1) {
			return;
		}
		this.sortRows(index);
	}
}
