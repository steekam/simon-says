/**
 * Creates a state object with Proxy to hook 
 * refreshDom on the set property
 * @param {Object} state 
 */
function createState(state) {
  return new Proxy(state, {
    set(target, property, value) {
      target[property] = value; // default set behaviour
      refreshDom(); //updated view
      return true;
    }
  })
}

/**
 * Refresh the DOM from a certain root element 
 * updating bindings
 * @param {*} root 
 * @param {Object} data State used in binding
 */
function refreshDom() {
  walkDom(root, el => {
    if (el.hasAttribute('x-text')) {
      let expression = el.getAttribute('x-text');
      el.innerText = eval(`with (state) { (${expression}) }`);
    }
  })
}

/**
 * Traverses the whole DOM
 * @param {*} el 
 * @param {Function} callback 
 */
function walkDom(el, callback) {
  callback(el)

  el = el.firstElementChild

  while (el) {
    walkDom(el, callback)

    el = el.nextElementSibling
  }
}

/**
 * Sleep for set milliseconds
 * @param {int} ms 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* Add hidden class from element
* @param {*} element 
*/
function hideElement(element) {
  if (!element.classList.contains('hidden')) {
      element.classList.add('hidden')
  }
}

/**
* Remove hidden class from element
* @param {*} element 
*/
function showElement(element) {
  if (element.classList.contains('hidden')) {
      element.classList.remove('hidden')
  }
}

/**
 * Get a random number in the specified min,max range 
 * inclusive of the min and max.
 * @param {Number} min
 * @param {Number} max 
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

/**
* Display counter in element
* @param {*} element 
* @param {number} countTo 
* @param {boolean} forward Default: true
*/
async function counter(element, countTo, forward = true) {
  return new Promise(async resolve => {
      let count = forward ? 1 : countTo;
      const condtion = () => forward ? count <= countTo : count > 0;
      const next = () => forward ? count++ : count--;

      for (count; condtion(); next()) {
          element.innerHTML = count;
          await sleep(800);
      }
      resolve();
  });
}

function disableInputControls() {
  document.querySelectorAll('.controls button')
      .forEach(button => button.disabled = true);
}

function enableInputControls() {
  document.querySelectorAll('.controls button')
      .forEach(button => button.disabled = false);
}

// Level logic
function initialLevel() {
  return {
      id: 1,
      sequenceLength: 4,
      successToAdvance: 2,
      failureToReset: 2
  };
}

function getNextLevel() {
  let { level } = state;

  return {
      id: ++level.id,
      sequenceLength: ++level.sequenceLength,
      successToAdvance: ++level.successToAdvance,
      failureToReset: 2
  }
}

function getPreviousLevel() {
  let { level } = state;

  return {
      id: --level.id,
      sequenceLength: --level.sequenceLength,
      successToAdvance: --level.successToAdvance,
      failureToReset: 2
  }
}