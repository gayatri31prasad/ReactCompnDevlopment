export function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => {
    callback.apply(context, callbackArgs);
    timeout = null;
  };

  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    callbackArgs = arguments;
    timeout = setTimeout(later, wait);
  }
}


/*      Super Simple Events & Hooks
*  Author: Dash Automation, LLC.
*  Braden R. Napier
*  http://www.dashos.net
*
*  This was meant to be an extremely lightweight platform for registering
*  callbacks and triggering those callbacks.  It was not meant to provide
*  the many features of other options, but really meant as an extremely
*  low footprint option for triggering a callback based on an event in
*  your system.  It can also be used for simple communication between
*  your components, although this should generally be done following the
*  react design guidelines.
*/

// var Events = require('react-native-events')

// Example: Events.listen('ready', 'myID', myCallback)
// Events.trigger('ready', myData)
// Events.remove('ready', 'myID')
// Events.removeAll('ready');

var Callbacks = {};

var Events = {
  on: (at, id, callback) => { return Events.listen(at, id, callback) },
  listen: (at, id, callback) => {
    if (at == '') { return false }
    if (at in Callbacks) {
      Callbacks[at][id] = callback;
    } else {
      Callbacks[at] = {};
      Callbacks[at][id] = callback;
    }
    return id;
  },
  t: (at, data) => { return Events.trigger(at, data) },
  trigger: (at, data) => {
    data = data || ''; var obj = Callbacks[at];
    for (var prop in obj) { if (obj.hasOwnProperty(prop)) { obj[prop](data) } }
  },
  rm: (at, id) => { return Events.remove(at, id) },
  remove: (at, id) => { delete Callbacks[at][id] },
  removeAll: (at) => { delete Callbacks[at] }
};

export default Events;