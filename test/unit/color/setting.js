suite('color/Setting', function() {
  let myp5; // sketch without WEBGL Mode
  let my3D; // sketch with WEBGL mode
  setup(function(done) {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
      };
    });
    new p5(function(p) {
      p.setup = function() {
        p.createCanvas(100, 100, p.WEBGL);
        my3D = p;
      };
    });
    done();
  });

  teardown(function() {
    myp5.remove();
    my3D.remove();
  });

  suite('p5.prototype.erase', function() {
    test('should be a function', function() {
      assert.ok(myp5.erase);
    });

    test('should set renderer to erasing state', function() {
      myp5.erase();
      assert.isTrue(myp5._renderer._isErasing);
    });

    test('should cache renderer fill', function() {
      myp5.fill(255, 0, 0);
      const fillStyle = myp5.drawingContext.fillStyle;
      myp5.erase();
      assert.deepEqual(myp5._renderer._cachedFillStyle, fillStyle);
    });

    test('should cache renderer stroke', function() {
      myp5.stroke(255, 0, 0);
      const strokeStyle = myp5.drawingContext.strokeStyle;
      myp5.erase();
      assert.deepEqual(myp5._renderer._cachedStrokeStyle, strokeStyle);
    });

    test('should cache renderer blend', function() {
      myp5.blendMode(myp5.SCREEN);
      myp5.erase();
      assert.deepEqual(myp5._renderer._cachedBlendMode, myp5.SCREEN);
    });

    test('should set fill strength', function() {
      myp5.erase(125);
      assert.equal(
        myp5.color(myp5.drawingContext.fillStyle).array,
        myp5.color(255, 125).array
      );
    });

    test('should set stroke strength', function() {
      myp5.erase(255, 50);
      assert.equal(
        myp5.color(myp5.drawingContext.strokeStyle).array,
        myp5.color(255, 50).array
      );
    });
  });

  suite('p5.prototype.colorMode', function() {
    test('should be a function', function() {
      assert.ok(myp5.colorMode);
    });

    test('should set mode to RGB', function() {
      myp5.colorMode(myp5.RGB);
      assert.equal(myp5._colorMode, myp5.RGB);
    });

    test('should correctly set color RGB maxes', function() {
      assert.deepEqual(myp5._colorMaxes[myp5.RGB], [255, 255, 255, 255]);
      myp5.colorMode(myp5.RGB, 1, 1, 1);
      assert.deepEqual(myp5._colorMaxes[myp5.RGB], [1, 1, 1, 255]);
      myp5.colorMode(myp5.RGB, 1);
      assert.deepEqual(myp5._colorMaxes[myp5.RGB], [1, 1, 1, 1]);
      myp5.colorMode(myp5.RGB, 255, 255, 255, 1);
      assert.deepEqual(myp5._colorMaxes[myp5.RGB], [255, 255, 255, 1]);
      myp5.colorMode(myp5.RGB, 255);
    });

  });


});
