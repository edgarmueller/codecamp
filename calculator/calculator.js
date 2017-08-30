var entries = [0];

// https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

function asFixed(num) {
  if (isInt(num)) {
    return num;
  }
  var fixed = num.toFixed(3);
  while (fixed.charAt(fixed.length - 1) === '0') {
    fixed = fixed.substr(0, fixed.length - 1);
  }
  return fixed;
}

function drawExpression(expression) {
  var expressionElement = document.getElementById('expression');
  expressionElement.innerText = expression;
}

function drawDisplay(expression) {
  var display = document.getElementById('display');
  display.innerText = expression;
}

function allClear() {
  entries = [0];
  drawDisplay(0);
  drawExpression();
}

function clearEntry() {
  if (entries.length > 1) {
    entries = entries.slice(0, entries.length - 1);
  }
  drawExpression(entries.join(' '));
}

function buttonPressed(val) {

  switch (val) {
    case '=':
      try {
        var result = asFixed(eval(entries.join('')));
        drawDisplay(result);
        entries = [result];
      } catch (error) {
        console.error(error);
        drawDisplay('Malformed expression');
      }
      break;
    default:
      if (entries.length === 1 && entries[0] === 0) {
        entries = [val];
      } else {
        var top = entries[entries.length - 1];
        if (top === '-' && val === '-') {
          // replace -- with +
          entries[entries.length - 1] = '+';
        } else if (top === '/' && val === '0') {
          drawExpression('Division by zero is undefined')
          return;
        } else {
          entries.push(val);
        }
      }
      drawExpression(entries.join(' '));
  }
}

drawExpression(0);