suite('3D Primitives', function() {
  var myp5;

  if (!window.Modernizr.webgl) {
    return;
  }

  setup(function() {
    myp5 = new p5(function(p) {
      p.setup = function() {
        p.createCanvas(100, 100, p.WEBGL);
      };
    });
  });

  teardown(function() {
    myp5.remove();
  });

  suite('p5.RendererGL.prototype.ellipse', function() {
    test('should be a function', function() {
      assert.ok(myp5._renderer.ellipse);
      assert.typeOf(myp5._renderer.ellipse, 'function');
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
    test('no friendly-err-msg. detail parameter > 50', function() {
      assert.doesNotThrow(
        function() {
          myp5.ellipse(50, 50, 120, 30, 51);
        },
        Error,
        'got unwanted exception'
      );
    });
  });

  suite('p5.RendererGL.prototype.arc', function() {
    test('should be a function', function() {
      assert.ok(myp5._renderer.arc);
      assert.typeOf(myp5._renderer.arc, 'function');
    });
    test('no friendly-err-msg', function() {
      assert.doesNotThrow(
        function() {
          myp5.arc(1, 1, 10.5, 10, 0, Math.PI, 'pie');
        },
        Error,
        'got unwanted exception'
      );
    });
    test('missing param #4, #5', function() {
      assert.validationError(function() {
        myp5.arc(1, 1, 10.5, 10);
      });
    });
    test('wrong param type at #0', function() {
      assert.validationError(function() {
        myp5.arc('a', 1, 10.5, 10, 0, Math.PI, 'pie');
      });
    });
    test('no friendly-err-msg. detail parameter > 50', function() {
      assert.doesNotThrow(
        function() {
          myp5.arc(1, 1, 100, 100, 0, Math.PI / 2, 'chord', 51);
        },
        Error,
        'got unwanted exception'
      );
    });
    test('no friendly-err-msg. default mode', function() {
      assert.doesNotThrow(
        function() {
          myp5.arc(1, 1, 100, 100, Math.PI / 4, Math.PI / 3);
        },
        Error,
        'got unwanted exception'
      );
    });
  });
});
