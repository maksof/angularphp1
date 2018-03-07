app.factory('Common', ['$http', 'Api', function($http, Api) {
   var Common = {};

  /*Check the index of file in search videos array*/
  Common.checkIndexOfFile = function(video, array) {
    var index = array.indexOf(video);
    return index;
  }
  
  /*Format Comment Date for comments*/
  Common.formatDate = function(hrs) {

    if (hrs < 24) {
      return (hrs == 1)? hrs + " hour ago" : hrs + " hours ago";
    } else if (hrs > 24 && hrs < 168) {
      var days = Math.round(hrs / 24);
      return (days == 1)? days + " day ago" : days + " days ago";
    } else if (hrs > 168 && hrs < 700) {
      var weeks = Math.round(hrs / 168);
      return (weeks == 1)? weeks + " week ago" : weeks + " weeks ago";
    } else if (hrs > 700 && hrs < 8760) {
      var months = Math.round(hrs / 700);
      return (months == 1)? months + " month ago" : months + " months ago";
    } else if (hrs > 8760) {
      var years = Math.round(hrs / 8760);
      return (years == 1)? years + " year ago" : years + " years ago";
    }    
  }

  Common.formatPriceInDecimal = function(price) {

    if (price % 1 == 0) return price+".00";
    else return price;
  }

  Common.shuffleArray = function(array) {
    
    var m = array.length, t, i;
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  Common.required = function(value) {
    if (value != '' && value != undefined && value != null) return true;
    else return false;
  }

  Common.stringGen = function(len) {
    var text = "";      
    var charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
  }
  Common.checkValidEmail = function(mail) {  
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    } else {
      return false;
    }
  }

  Common.formatDateForProfile = function(date) {
    var d = new Date(date);
    var day = d.getDate() > 9 ? d.getDate() : '0'+ d.getDate();
    var month = d.getMonth()+1 > 9 ? d.getMonth()+1 : '0'+ d.getMonth()+1;
    var hours = d.getHours() > 9 ? d.getHours() : '0'+ d.getHours();
    var minutes = d.getMinutes() > 9 ? d.getMinutes() : '0'+ d.getMinutes();
    dformat = day + "/"+ month + "/" + d.getFullYear() + " " + hours + ":" + minutes; 
    return dformat;
  }

  Common.UTCdatetime = function(date) {
    var d = new Date(date);
    var day = d.getUTCDate() > 9 ? d.getUTCDate() : '0'+ d.getUTCDate();
    var month = d.getUTCMonth()+1 > 9 ? d.getUTCMonth()+1 : '0'+ d.getUTCMonth()+1;
    var hours = d.getUTCHours() > 9 ? d.getUTCHours() : '0'+ d.getUTCHours();
    var minutes = d.getUTCMinutes() > 9 ? d.getUTCMinutes() : '0'+ d.getUTCMinutes();
    dformat = day + "/"+ month + "/" + d.getUTCFullYear() + " " + hours + ":" + minutes; 
    return dformat;
  }

  Common.shortdate = function(date) {
    var d = new Date(date);
    var day = d.getDate() > 9 ? d.getDate() : '0'+ d.getDate();
    var month = d.getMonth()+1 > 9 ? d.getMonth()+1 : '0'+ d.getMonth()+1;
    var year = parseInt(d.getFullYear().toString().substring(2));
    var date = day + "/"+ month + "/" + year; 
    return date;
  }

  Common.formatPayoutDate = function(date) {

    var d = new Date(date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var day = d.getDate() > 9 ? d.getDate() : '0'+ d.getDate();
    var hours = d.getHours() > 9 ? d.getHours() : '0'+ d.getHours();
    var minutes = d.getMinutes() > 9 ? d.getMinutes() : '0'+ d.getMinutes();
    var date = day + " "+ months[d.getMonth()] + ", " + d.getFullYear() + " " + hours + ":" + minutes; 
    return date;
  }

  Common.formatTime = function(date) {

    var d = new Date(date);
    var hours = d.getHours() > 9 ? d.getHours() : '0'+ d.getHours();
    var minutes = d.getMinutes() > 9 ? d.getMinutes() : '0'+ d.getMinutes();
    var time = hours + ":" + minutes; 
    return time;
  }

  Common.formatRegisteredDate = function(date) {

    var d = new Date(date);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = d.getDate() > 9 ? d.getDate() : '0'+ d.getDate();
    var date = day + " "+ months[d.getMonth()] + ", " + d.getFullYear();
    return date;
  }

  Common.getCardType = function(number) { 
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
     if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
        return "Master Card";

    // AMEX
    re = new RegExp("^3[347]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
  }

  Common.getRandomCode = function() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  
  return Common;
}]);