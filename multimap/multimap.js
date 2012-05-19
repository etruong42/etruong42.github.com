if( typeof MULTIMAP === "undefined" || !MULTIMAP) { var MULTIMAP = {};}

(function() {
	this.initialize = function() {
		$("#btnCalculate").click(MULTIMAP.calculateDistances);
		$(".displayhint").mouseenter(function() {
			$(this).next().removeClass('hide');
		});
		$(".displayhint").mouseout(function() {
			$(this).next().addClass('hide');
		});
	}
	
	this.calculateDistances = function() {
		var elOrigin = $("#origin");
		var elDestinations = $("#destinations");
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
			origins: [elOrigin.val()],
			destinations: elDestinations.val().split("\n"),
			travelMode: google.maps.TravelMode.WALKING,
			avoidHighways: false,
			avoidTolls: false
		}, MULTIMAP.displayDistances);
	}
	var glob;
	var DEST_HEADER = "Destination";
	var DIST_HEADER = "Distance";
	var resultsTable;
	function getNewResultsTable(rows) {
		return new Table([DEST_HEADER, DIST_HEADER], rows);
	}
	
	this.displayDistances = function(response, status) {
		var rows = new Array();
		$("#results").html("");
		if (status === google.maps.DistanceMatrixStatus.OK) {
			glob = response;
			var origins = response.originAddresses;
			var destinations = response.destinationAddresses;
			
			for (var i = 0; i < origins.length; i++) {
				var results = response.rows[i].elements;
				
				for (var j = 0; j < results.length; j++) {
					var element = results[j];
					var distance = element.distance.value;
					var duration = element.duration.text;
					var from = origins[i];
					var to = destinations[j];
					rows[j] = new Array();
					rows[j][0] = to;
					rows[j][1] = distance;
				}
			}
		}
		resultsTable = getNewResultsTable(rows);
		resultsTable.sortRows(1);
		var resultsDiv = document.getElementById("results");
		resultsDiv.appendChild(resultsTable.getTableElement());
	}
}).apply(MULTIMAP);
	
 $(document).ready(function () {
	MULTIMAP.initialize();
});