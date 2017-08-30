beforeEach(function () {
  pressButton('AC');
});

describe('Calculator', function() {

  describe('addition', function() {
    it('should add positive numbers', function() {
      press([
        '1',
        '+',
        '3',
        '='
      ]);
      expect(result()).to.equal('4');
    });

    it('should add negative numbers', function () {
      press([
        '-',
        '1',
        '+',
        '-',
        '3',
        '='
      ]);
      expect(result()).to.equal('-4');
    });

    it('should add a positive and a negative number', function () {
      press([
        '1',
        '+',
        '-',
        '3',
        '='
      ]);
      expect(result()).to.equal('-2');
    });
  });

  describe('subtraction', function () {
    it('should subtract two integers', function() {
      press([
        '3',
        '-',
        '1',
        '='
      ]);
      expect(result()).to.equal('2');
    });

    it('should subtract two negative numbers', function () {
      press([
        '-',
        '3',
        '-',
        '-',
        '1',
        '='
      ]);
      expect(result()).to.equal('-2');
    });

    it('should subtract one negative and one positive number', function () {
      press([
        '-',
        '3',
        '-',
        '1',
        '='
      ]);
      expect(result()).to.equal('-4');
    });
  });

  describe('multiplication', function () {
    it('should multiply two numbers', function() {
      press([
        '1',
        '.',
        '2',
        '1',
        '*',
        '3',
        '='
      ]);
      expect(result()).to.equal('3.63')
    });

    it('should multiply two negative numbers', function() {
      press([
        '-',
        '3',
        '*',
        '-',
        '1',
        '.',
        '2',
        '='
      ]);
      expect(result()).to.equal('3.6');
    });

    it('should multiply one negative and one positive number', function () {
      press([
        '3',
        '*',
        '-',
        '1',
        '.',
        '2',
        '='
      ]);
      expect(result()).to.equal('-3.6');
    })
  });

  describe('division', function () {
    it('should divide two integers', function () {
      press([
        '4',
        '/',
        '2',
        '='
      ]);
      expect(result()).to.equal('2');
    });

    it('should divide two negative numbers', function () {
      press([
        '3',
        '.',
        '6',
        '/',
        '1',
        '.',
        '2',
        '='
      ]);
      expect(result()).to.equal('3');
    });

    it('should divide one positive and one integer number', function () {
      press([
        '3',
        '.',
        '6',
        '/',
        '3',
        '='
      ]);
      expect(result()).to.equal('1.2');
    });

    it('should report an error when diving by zero', function () {
      press([
        '3',
        '/',
        '0'
      ]);
      expect(expression()).to.equal('Division by zero is undefined')
    });

    it('should divide a number by a negative number', function () {
      press([
        '3',
        '.',
        '6',
        '/',
        '-',
        '3',
        '='
      ]);
      expect(result()).to.equal('-1.2')
    });

    it('should divide zero by any number', function () {
      press([
        '0',
        '/',
        '3',
        '='
      ]);
      expect(result()).to.equal('0');
    });
  });

  describe('order of operations', function () {

    it('should multiply before adding', function () {
      press([
        '3',
        '+',
        '6',
        '*',
        '2',
        '='
      ]);
      expect(result()).to.equal('15');
    });

    it('should evaluate bracket expressions first', function () {
      press([
        '(',
        '3',
        '+',
        '6',
        ')',
        '*',
        '2',
        '='
      ]);
      expect(result()).to.equal('18');
    })
  });
});

function pressButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.click();
}

function result() {
  var display = document.getElementById('display');
  return display.innerText;
}

function expression() {
  var expression = document.getElementById('expression');
  return expression.innerText;
}

function press(buttonSequence) {
  buttonSequence.forEach(function(buttonId) {
    pressButton(buttonId);
  })
}
