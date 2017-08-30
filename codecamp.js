var romanNumerals = [
  {
    literal: 'M',
    value: 1000
  },
  {
    literal: 'CM',
    value: 900
  },
  {
    literal: 'D',
    value: 500
  },
  {
    literal: 'CD',
    value: 400
  },
  {
    literal: 'C',
    value: 100
  },
  {
    literal: 'XC',
    value: 90
  },
  {
    literal: 'L',
    value: 50
  },
  {
    literal: 'XL',
    value: 40
  },
  {
    literal: 'X',
    value: 10
  },
  {
    literal: 'IX',
    value: 9
  },
  {
    literal: 'V',
    value: 5
  },
  {
    literal: 'IV',
    value: 4
  },
  {
    literal: 'I',
    value: 1
  }
];

function repeat(times, string) {
  var result = '';
  while (times > 0) {
    result += string;
    times -= 1;
  }
  return result;
}

function convertToRoman(num) {
  var result = romanNumerals.reduce(function(acc, currentNumeral) {
    var times = Math.floor(acc.rest/currentNumeral.value);
    return {
      romanNumeral: acc.romanNumeral + repeat(times, currentNumeral.literal),
      rest: acc.rest - times * currentNumeral.value
    }
  }, {
    romanNumeral: '',
    rest: num
  });
  return result.romanNumeral;
}

function whatIsInAName(collection, source) {
  // Only change code below this line
  return collection.filter(function(element) {
    var props = Object.keys(source);
    return props.reduce(function (match, prop) {
      return element.hasOwnProperty(prop) && match && source[prop] === element[prop];
    }, true);
  });
}

function isUppercase(char) {
  return char === char.toUpperCase();
}


function myReplace(str, before, after) {
  var words = str.split(' ');
  var beforeIndex = words.indexOf(before);
  var replacement = after;
  if (isUppercase(before.charAt(0))) {
    replacement = after.charAt(0).toUpperCase() + after.substr(1);
  }
  words[beforeIndex] = replacement;
  return words.join(' ');
}

function flatten(nestedArr) {
  var flattened = [];
  for (var i = 0; i < nestedArr.length; i++) {
    if (typeof nestedArr[i] === "object") {
      flattened = flattened.concat(flatten(nestedArr[i]));
    } else {
      flattened.push(nestedArr[i]);
    }
  }
  return flattened;
}


function uniteUnique(arr) {
  var union = arr;
  for (var i = 1; i < arguments.length; i++) {
    var flattened = flatten(arguments[i]);
    for (var j = 0; j < flattened.length; j++) {
      if (union.indexOf(flattened[j]) === -1) {
        union.push(flattened[j]);
      }
    }
  }

  return union;
}

function spinalCase(str) {
  var s = str
    .replace(/[A-Z]/g, function(char) { return ' ' + char.toLowerCase(); })
    .replace(/_/g, ' ')
    .replace(/\s+/g, '-');
  if (s.charAt(0) === '-') {
    return s.substr(1);
  }
  return s;
}


function fib(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

module.exports = {
  fromDecimal: convertToRoman,
  filterBySetting: whatIsInAName,
  replaceWord: myReplace,
  flatten: flatten,
  uniqUnion: uniteUnique,
  spinalCase: spinalCase,
  fib: fib
};