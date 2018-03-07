'use strict';
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('pagination', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input) {
        	return input.slice(start);	
        }
    }
});