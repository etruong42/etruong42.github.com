if( typeof PCLOREM === "undefined" || !PCLOREM ) { var PCLOREM = {}; }

(function() {
	this.populate = function() {
		var startTag = "";
		var endTag = "";
		var wrapTags = $("#wrapTag").val();
		if($("#wrapCheckbox").is(':checked') && wrapTags){
			startTag = wrapTags;
			endTag = wrapTags[0] + "/" + wrapTags.substring(1);
		}
		this.clearResults();
		//$(PCLOREM.paragraphs[0]).each(function(index, value){
		//	PCLOREM.addParagraphToResults(startTag + value + endTag);
		//});
		
		var numParagraphs = this.getNumParagraphToGenerate();
		
		for(var x = 0; x < numParagraphs; x++) {
			var selectedIndices = this.getSelectedIndices();
			var selectionIndex = 
				selectedIndices[this.rand(0, selectedIndices.length-1)];
			var paragraphIndex = 
				this.rand(0, this.paragraphs[selectionIndex].length-1);
			console.log("paragraph from: " + this.titles[selectionIndex]);
			PCLOREM.addParagraphToResults(startTag + this.paragraphs[selectionIndex][paragraphIndex] + endTag);
		}
		
	}
	
	this.rand = function(lower, upper) {
		if(lower === upper) return lower;
		return Math.floor(Math.random()*(upper-lower+1)) + lower;
	}
	
	this.addParagraphToResults = function(paragraph) {
		if(PCLOREM.getResultsElement().val()) {
			PCLOREM.getResultsElement().val($("#results").val() + "\n\n");
		}
		
		PCLOREM.getResultsElement().val($("#results").val() + paragraph.toString())
	}
	
	this.clearResults = function() {
		this.getResultsElement().val("");
	}
	
	this.getResultsElement = function() {
		return $("#results");
	}

	this.getParagraphs = function() {
		var paragraphs = "";
		var startTag = "";
		var endTag = "";
		var wrapTags = $("#wrapTag").val();
		if($("#wrapCheckbox").is(':checked')){
			startTag = wrapTags;
			endTag = wrapTags[0] + "/" + wrapTags.substring(1);
		}
		$(PCLOREM.paragraphs[0]).each(function(index, value){paragraphs += startTag + value + endTag + "\n\n";});
		paragraphs = paragraphs.substring(0, paragraphs.length-2);
		return paragraphs;
	}
	
	this.getNumParagraphToGenerate = function() {
		return $("#txtNumParagraphs").val();
	}
	
	//could just get index of selected children, but want to decouple ordering
	//of view from ordering of model
	this.getSelectedIndices = function() {
		var indices = new Array();
		var selectedbooks = this.getSelectedBooks();
		$(PCLOREM.titles).each(function(index, value) {
			if($.inArray(this.toString(), selectedbooks) > -1) {
				indices.push(index);
			}
		});
		return indices;
	}
	
	this.getSelectedBooks = function() {
		var selectedBooks = new Array();
		var selectedBookElements = this.getBookSelectionElements();
		$(selectedBookElements).each(function(index, value) {
			if($(value).hasClass("active")) {
				selectedBooks.push($(value).html());
			}
		});
		return selectedBooks;
	}
	
	this.getBookSelectionElements = function() {
		return this.getBookSelectionRootElement().children("button");
	}
	
	this.getBookSelectionRootElement = function() {
		return $("#bookselections");
	}
	
	this.initialize = function() {
		$(this.titles).each(function(index, value) {
			$("#bookselections").append(PCLOREM.createAndGetCheckboxForTitle(value))
		});	
		this.populate();
	}
	
	this.createAndGetCheckboxForTitle = function(booktitle) {
		return "<button class=\"btn active bookbutton btn-info\">"+booktitle+"</button>"
	}
}).apply(PCLOREM);

 $(document).ready(function () {
	PCLOREM.initialize();
	
	$(".generator").keypress(function(event) {
		if ( event.which == 13 ) {
			PCLOREM.populate();
		}
	});
});