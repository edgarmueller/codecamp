var ava = require('ava');
var codecamp = require('./codecamp');

ava.test('roman numeral conversion', function(t) {
  t.is(codecamp.fromDecimal(4), 'IV');
  t.is(codecamp.fromDecimal(97), 'XCVII');
  t.is(codecamp.fromDecimal(9), 'IX');
});

ava.test('filterBySetting should filter by prop and its according value', function(t) {
  var filtered = codecamp.filterBySetting([
      { first: "Romeo", last: "Montague" },
      { first: "Mercutio", last: null },
      { first: "Tybalt", last: "Capulet" }
    ],
    { last: "Capulet" }
  );
  t.is(filtered.length, 1);
});

ava.test('replaceWord should replace a word and preserve casing', function (t) {
  t.is(
    codecamp.replaceWord("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped"),
    "A quick brown fox Leaped over the lazy dog"
  );
  t.is(
    codecamp.replaceWord("Let us go to the store", "store", "mall"),
    "Let us go to the mall"
  );
});

ava.test("flatten should flatten nested arrays", function(t) {
  t.deepEqual(codecamp.flatten([[1,2,3], [4], [5,6]]), [1,2,3,4,5,6])
});

ava.test("uniqUnion should return union in order of occurrence", function (t) {
  t.deepEqual(
    codecamp.uniqUnion([1, 3, 2], [1, [5]], [2, [4]]),
    [1, 3, 2, 5, 4]
  )
});

ava.test('fib', function (t) {
  t.is(codecamp.fib(6), 13);
});

ava.test('spinalCase', function (t) {
  t.is(codecamp.spinalCase("thisIsSpinalTap"), "this-is-spinal-tap");
  t.is(codecamp.spinalCase("This Is Spinal Tap"), "this-is-spinal-tap");
  t.is(codecamp.spinalCase("The_Andy_Griffith_Show"), "the-andy-griffith-show");
});

// ava.test('validate us telephone numbers', function (t) {
//   t.true(codecamp.telephoneCheck("555-555-555"));
//   t.true(codecamp.telephoneCheck("(555)555-555"));
//   t.true(codecamp.telephoneCheck("(555) 555-555"));
//   t.true(codecamp.telephoneCheck("555 555 555"));
//   t.true(codecamp.telephoneCheck("555555555"));
//   t.true(codecamp.telephoneCheck("1 555 555 555"));
// });