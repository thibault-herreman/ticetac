
/* Date Format */
function dateFormat (d) { 

    var c = '';
  
    if (d == null) {
      return c;
    }
    c = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return c;
  }

module.exports = dateFormat;





