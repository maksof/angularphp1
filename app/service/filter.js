app.filter('reverse', function() {
  return function(items) {
  	if (items) {
  		return items.slice().reverse();	
  	}    
  };
});

app.filter('nl2br', function($sce){
      return function(msg,is_xhtml) { 
          var is_xhtml = is_xhtml || true;
          var breakTag = (is_xhtml) ? '<br />' : '<br>';
          var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
          return $sce.trustAsHtml(msg);
      }
  });

app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });