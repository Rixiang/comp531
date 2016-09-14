// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        var pormise = fetch(url)
                        .then(r => r.json())
                        .then(r => numWord(r));
        return promise;
    }


    function numWord(r){
        var map = {};
        var articles = r.articles;
        for (var i in articles){
            var length = articles[i].text.split(" ").length;
            map[articles[i]._id] = length; 
        }  
        return map;
    }


    function countWordsSafe(url) {
        var promise = countWords(url)
                        .catch(function(error){
                        return [];
                        })
        return promise;
    }

    function getLargest(url) {
        var promise = fetch(url)
                        .then(r => r.json())
                        .then(r => findLargest(r));
        return promise;
    }

    function findLargest(r){
        var id = 0;
        var num = 0;
        r.articles.forEach(function(article){
            if(article.text.split(" ").length > num){
                num = article.text.split(" ").length;
                id = article._id.toString(); 
            }
        });
        return id;
    }

    exports.inclass = {
        author: "Xiang Li",
        countWords, countWordsSafe, getLargest
    }

})(this);