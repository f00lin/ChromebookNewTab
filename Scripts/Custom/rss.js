var bbc_news = "http://feeds.bbci.co.uk/news/rss.xml?edition=uk";
var bbc_science = "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk";

var feed_length = 20;




// get feed bbc news

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: bbc_news,
        dataType: "xml",
        success: xmlParser
    });
});


function xmlParser(xml) {
   
   var count = 0; 
   
   // display each item as a link
   $(xml).find("item").each(function () {
     
       $("#rss_news").append("<div class=\"rss_story\"><a class=\"red\" href=" +
       $(this).find("link").text() +  ">" +
       $(this).find("title").text() + "</a>" +
        "</div>");
       
       count++
       
       // break out once required number of items displayed
       if(count >= feed_length) {
	 return(false);
       }
       
     });
  
}





// get feed bbc science

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: bbc_science,
        dataType: "xml",
        success: xmlParser2
    });
});


function xmlParser2(xml) {
   
   var count = 0; 
   
   // display each item as a link
   $(xml).find("item").each(function () {
     
       $("#rss_science").append("<div class=\"rss_story\"><a class=\"green\" href=" +
       $(this).find("link").text() + ">" +
       $(this).find("title").text() + "</a>" + 
       "</div>");
       
       count++
       
       // break out once required number of items displayed
       if(count >= feed_length) {
	 return(false);
       }
       
     });
  
}

