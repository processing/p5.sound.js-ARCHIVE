suite('2D Primitives', function() {
  var myp5;

  setup(function(done) {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
        done();
      };
    });
  });

  teardown(function() {
    myp5.remove();
  });



  suite('p5.prototype.ellipse', function() {
    test('should be a function', function() {
      assert.ok(myp5.ellipse);
      assert.typeOf(myp5.ellipse, 'function');
    });
    test('no friendly-err-msg', function() {
      assert.doesNotThrow(
        function() {
          myp5.ellipse(0, 0, 100);
        },
        Error,
        'got unwanted exception'
      );
    });
    test('missing param #2', function() {
      assert.validationError(function() {
        myp5.ellipse(0, 0);
      });
    });
    test('missing param #2', function() {
      assert.validationError(function() {
        var size;
        myp5.ellipse(0, 0, size);
      });
    });
    test('wrong param type at #0', function() {
      assert.validationError(function() {
        myp5.ellipse('a', 0, 100, 100);
      });
    });
  });

});
