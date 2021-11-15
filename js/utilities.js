//Defines an object that has some tool tip functions

var U = {

  //For getting the document element by ID
  $: function(id) {
    'use strict';
    if (typeof id =='string') {
      return document.getElementById(id);
    }

  },

  //Function for setting the text of an element
  setText: function(id, message) {
    'use strict';

    if ((typeof id == 'string') && (typeof message == 'string')) {

      //Get reference of element
      var output = this.$(id);
      if (!output) {
        return false;
      }

      //Set the text
      if (output.textContent !== undefined) {
        output.textContent = message;
      }
      else {
        output.innerText = message;
      }
      return true;
    }
  },

  //Function for creating event listeners
  addEvent: function(obj, type, fn) {
    'use strict';

    if (obj && obj.addEventListener()) {
      //This is for modern browsers
      obj.addEventListener(type,fn,false);
    }
    else if (obj && obj.attachEvent()) {
      //This is for older browsers
      obj.attachEvent('on' + type, fn);
    }
  },

  //Function for removing event listeners
  removeEvent: function(obj, type, fn) {
    'use strict';

    if (obj && obj.removeEventListener()) {
      //New browsers
      obj.removeEventListener(type, fn, false);

    }
    else if (obj && obj.detachEvent()) {
      //Older browsers
      obj.detachEvent('on' + type, fn);
    }
  },

  //Enable tooltips
  enableToolTips: function(id) {
    'use strict';

    //Get a reference to the element
    var elem = this.$(id);

    //Add four event handlers for the element
    this.addEvent(elem, 'focus', this.showTooltip);
    this.addEvent(elem, 'mouseover', this.showTooltip);
    this.addEvent(elem, 'blur', this.hideTooltip);
    this.addEvent(elem, 'mouseout', this.hideTooltip);

  },


  //Show tool tips

  showTooltip: function(e) {
    'use strict';

    //Get the event object
    if(typeof e == 'undefined') var e = window.event;

    //Get the event target
    var target = e.target || e.srcElement;
    document.getElementById(target.name + 'tip').style.visibility = 'visible';
  },


  //Hide tool tips

  hideTooltip: function(e) {
    'use strict';

    //Get the event object
    if (typeof e =='undefined') var e = window.event;
    //Get the event target
    var target = e.target || e.srcElement;
    document.getElementById(target.name + 'tip').style.visibility = 'hidden';

  },

};



