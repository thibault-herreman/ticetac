
/* Time Format */
function timeFormat (d) { 
    var c = '';
  
    if (d == null) {
      return c;
    }

    minutes = d.getMinutes();
    hours = d.getHours();
    if (minutes < 10) {
        return hours + ':0' + minutes;
    } else {
        return hours + ':' + minutes;
    }

  }

module.exports = timeFormat;
