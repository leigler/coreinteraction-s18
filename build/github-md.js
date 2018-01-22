function githubMD(newPage){

	var user = newPage.user,
		repository = newPage.repository,
		local = newPage.local;

	console.log("Github Markdown Page")

	showdown.setOption('customizedHeaderId', true);

	var liveURL = 'https://raw.githubusercontent.com/' + user + '/' + repository + '/master/contents/contents.md',
		testURL = 'contents/contents.md'

	var theURL = liveURL;

	if(local){
		theURL = testURL;
	}

	console.log(theURL)

	$.when($.ajax({
		dataType: 'text',
	    url: theURL, 
	    complete: function(r){

	    	var string = r.responseText
	    	var converter = new showdown.Converter(),
			text      = string,
			html      = converter.makeHtml(text);

			$( ".page-contents" ).append( $( html ) ); //introduce content

	    }
	 })).then(function(){

		$(".page-contents").css({"opacity" : 1, 
						"transform" : "translateY(0px)"})

		$("body").append("<a class='toc-button' href='#toc'><span>ToC</span></a>")



		setTimeout(function(){ 

			$(".toc-button").css({"opacity" : 1,
							  "transform" : "scale(1)"})
		 
		 }, 500);


	})

}

