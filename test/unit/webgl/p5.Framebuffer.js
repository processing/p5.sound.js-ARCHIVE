suite('p5.Framebuffer', function() {
  let myp5;

  if (!window.Modernizr.webgl) {
    return;
  }

  setup(function() {
    myp5 = new p5(function(p) {
      p.setup = function() {};
      p.draw = function() {};
    });
  });

  teardown(function() {
    myp5.remove();
  });

  suite('sizing', function() {
    test('auto-sized framebuffers change size with their canvas', function() {
      myp5.createCanvas(10, 10, myp5.WEBGL);
      myp5.pixelDensity(1);
      const fbo = myp5.createFramebuffer();
      const oldTexture = fbo.color.rawTexture();
      expect(fbo.width).to.equal(10);
      expect(fbo.height).to.equal(10);
      expect(fbo.density).to.equal(1);

      myp5.resizeCanvas(5, 15);
      myp5.pixelDensity(2);
      expect(fbo.width).to.equal(5);
      expect(fbo.height).to.equal(15);
      expect(fbo.density).to.equal(2);

      // The texture should be recreated
      expect(fbo.color.rawTexture()).not.to.equal(oldTexture);
    });

    test('manually-sized framebuffers do not change size with their canvas', function() {
      myp5.createCanvas(10, 10, myp5.WEBGL);
      myp5.pixelDensity(3);
      const fbo = myp5.createFramebuffer({ width: 20, height: 20, density: 1 });
      const oldTexture = fbo.color.rawTexture();
      expect(fbo.width).to.equal(20);
      expect(fbo.height).to.equal(20);
      expect(fbo.density).to.equal(1);

      myp5.resizeCanvas(5, 15);
      myp5.pixelDensity(2);
      expect(fbo.width).to.equal(20);
      expect(fbo.height).to.equal(20);
      expect(fbo.density).to.equal(1);

      // The texture should not be recreated
      expect(fbo.color.rawTexture()).to.equal(oldTexture);
    });

    suite('resizing', function() {
      let fbo;
      let oldTexture;
      setup(function() {
        myp5.createCanvas(10, 10, myp5.WEBGL);
        myp5.pixelDensity(1);
        fbo = myp5.createFramebuffer();
        oldTexture = fbo.color.rawTexture();

        fbo.resize(5, 15);
        fbo.pixelDensity(2);
      });

      test('framebuffers can be resized', function() {
        expect(fbo.width).to.equal(5);
        expect(fbo.height).to.equal(15);
        expect(fbo.density).to.equal(2);

        // The texture should be recreated
        expect(fbo.color.rawTexture()).not.to.equal(oldTexture);
      });

      test('resizing a framebuffer turns off auto-sizing', function() {
        oldTexture = fbo.color.rawTexture();

        myp5.resizeCanvas(20, 20);
        myp5.pixelDensity(3);

        expect(fbo.width).to.equal(5);
        expect(fbo.height).to.equal(15);
        expect(fbo.density).to.equal(2);

        // The texture should not be recreated
        expect(fbo.color.rawTexture()).to.equal(oldTexture);
      });
    });
  });

  suite('remove()', function() {
    test('remove() cleans up textures', function() {
      myp5.createCanvas(10, 10, myp5.WEBGL);
      const fbo = myp5.createFramebuffer();
      const numTextures = myp5._renderer.textures.size;
      fbo.remove();
      expect(myp5._renderer.textures.size).to.equal(numTextures - 2);
    });

    test(
      'remove() cleans up textures when the framebuffer has no depth',
      function() {
        myp5.createCanvas(10, 10, myp5.WEBGL);
        const fbo = myp5.createFramebuffer({ depth: false });
        const numTextures = myp5._renderer.textures.size;
        fbo.remove();
        expect(myp5._renderer.textures.size).to.equal(numTextures - 1);
      }
    );
  });

  suite('defaultCamera', function() {
    let fbo;
    setup(function() {
      myp5.createCanvas(10, 10, myp5.WEBGL);
      myp5.pixelDensity(1);
      fbo = myp5.createFramebuffer({ width: 5, height: 15 });
    });

    suite('the default camera', function() {
      test('it uses the aspect ratio of the framebuffer', function() {
        expect(fbo.defaultCamera.aspectRatio).to.equal(5 / 15);
        const z = -fbo.height / 2.0 / Math.tan(Math.PI / 3 / 2);
        const expectedCameraMatrix = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, z, 1
        ];
        for (let i = 0; i < expectedCameraMatrix.length; i++) {
          expect(fbo.defaultCamera.cameraMatrix.mat4[i])
            .to.be.closeTo(expectedCameraMatrix[i], 0.01);
        }
      });

      test('it updates the aspect ratio after resizing', function() {
        fbo.resize(20, 10);
        expect(fbo.defaultCamera.aspectRatio).to.equal(2);

        const z = -fbo.height / 2.0 / Math.tan(Math.PI / 3 / 2);
        const expectedCameraMatrix = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, z, 1
        ];
        for (let i = 0; i < expectedCameraMatrix.length; i++) {
          expect(fbo.defaultCamera.cameraMatrix.mat4[i])
            .to.be.closeTo(expectedCameraMatrix[i], 0.01);
        }
      });
    });
  });

  test(
    'loadPixels works in arbitrary order for multiple framebuffers',
    function() {
      myp5.createCanvas(20, 20, myp5.WEBGL);
      const fbo1 = myp5.createFramebuffer();
      const fbo2 = myp5.createFramebuffer();

      fbo1.loadPixels();
      fbo2.loadPixels();
      for (let i = 0; i < fbo1.pixels.length; i += 4) {
        // Set everything red
        fbo1.pixels[i] = 255;
        fbo1.pixels[i + 1] = 0;
        fbo1.pixels[i + 2] = 0;
        fbo1.pixels[i + 3] = 255;
      }
      for (let i = 0; i < fbo2.pixels.length; i += 4) {
        // Set everything blue
        fbo2.pixels[i] = 0;
        fbo2.pixels[i + 1] = 0;
        fbo2.pixels[i + 2] = 255;
        fbo2.pixels[i + 3] = 255;
      }
      fbo2.updatePixels();
      fbo1.updatePixels();

      myp5.imageMode(myp5.CENTER);

      myp5.clear();
      myp5.image(fbo1, 0, 0);
      assert.deepEqual(myp5.get(0, 0), [255, 0, 0, 255]);

      myp5.clear();
      myp5.image(fbo2, 0, 0);
      assert.deepEqual(myp5.get(0, 0), [0, 0, 255, 255]);
    }
  );
});
