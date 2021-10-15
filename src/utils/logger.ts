'use strict';
//@todo use better Logger
export default {
  log: (message = '') => {
    console.log("#Log: " + message);
  },
  error: (message = "Error!", extra: object) => {
    console.error("#Error: " + message);
    if (extra) {
      console.error(extra)
    }
  }
}