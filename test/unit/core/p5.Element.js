suite('p5.Element', function() {
  var myp5 = new p5(function(sketch) {
    sketch.setup = function() {};
    sketch.draw = function() {};
  });

  var elt;

  teardown(function() {
    if (elt && elt.parentNode) {
      elt.parentNode.removeChild(elt);
      elt = null;
    }
    myp5.remove();
  });

  suite('p5.Element.prototype.parent', function() {
    test('attaches child to parent', function() {
      let div0 = myp5.createDiv('this is the parent');
      let div1 = myp5.createDiv('this is the child');
      div1.attribute('id', 'child');
      div1.parent(div0); //attaches div1 to div0
      assert.equal(document.getElementById('child').parentElement, div0.elt);
    });

    test('attaches child to parent using classname', function() {
      let div0 = myp5.createDiv('this is the parent');
      let div1 = myp5.createDiv('this is the child');
      div0.attribute('id', 'parent');
      div1.parent('parent'); //attaches div1 to div0 using classname
      assert.equal(div1.parent(), div0.elt); //returns parent of div1
    });

    test('attaches child to parent using classname', function() {
      let div0 = myp5.createDiv('this is the parent');
      let div1 = myp5.createDiv('this is the child');
      div0.attribute('id', 'parent');
      div1.parent('#parent'); //attaches div1 to div0
      assert.equal(div1.parent(), div0.elt); //returns parent of div1 using id
    });

    test('returns the parent', function() {
      let div0 = document.createElement('div');
      let div1 = document.createElement('div');
      div1.setAttribute('id', 'child');
      div0.appendChild(div1);
      document.body.appendChild(div0);
      assert.equal(myp5.select('#child').parent(), div0);
    });
  });

  suite('p5.Element.prototype.id', function() {
    test('attaches child to parent', function() {
      elt = myp5.createDiv();
      elt.id('test');
      assert.equal(document.getElementById('test'), elt.elt);
    });

    test('returns the id', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'test');
      document.body.appendChild(elt);
      assert.equal(myp5.select('#child').id(), 'child');
    });
  });

  suite('operating with element classes', function() {
    test('should add class to element', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      document.body.appendChild(elt);

      myp5.select('#testdiv').addClass('testclass');
      assert.strictEqual(elt.getAttribute('class'), 'testclass');
    });

    test('should remove class from element with only one class', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      elt.setAttribute('class', 'testclass');
      document.body.appendChild(elt);

      myp5.select('#testdiv').removeClass('testclass');
      assert.strictEqual(elt.getAttribute('class'), '');
    });

    test('should remove class from element with several classes', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      elt.setAttribute('class', 'testclass1 testclass2 testclass3');
      document.body.appendChild(elt);

      myp5.select('#testdiv').removeClass('testclass2');
      assert.strictEqual(elt.getAttribute('class'), 'testclass1 testclass3');
    });

    test('should return true if element has specified class', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      elt.setAttribute('class', 'testclass1 testclass2 testclass3');
      document.body.appendChild(elt);

      assert.strictEqual(myp5.select('#testdiv').hasClass('testclass2'), true);
    });

    test('should return false if element has not specified class', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      elt.setAttribute('class', 'testclass1 testclass3');
      document.body.appendChild(elt);

      assert.strictEqual(myp5.select('#testdiv').hasClass('testclass2'), false);
    });

    test('should return false if element has class that is partially similar as specified class', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      elt.setAttribute('class', 'testclass slideshow newtestsclas');
      document.body.appendChild(elt);

      assert.strictEqual(myp5.select('#testdiv').hasClass('show'), false);
      assert.strictEqual(myp5.select('#testdiv').hasClass('slide'), false);
      assert.strictEqual(myp5.select('#testdiv').hasClass('test'), false);
      assert.strictEqual(myp5.select('#testdiv').hasClass('class'), false);
    });

    test('should toggle specified class on element', function() {
      elt = document.createElement('div');
      elt.setAttribute('id', 'testdiv');
      elt.setAttribute('class', 'testclass1 testclass2');
      document.body.appendChild(elt);

      myp5.select('#testdiv').toggleClass('testclass2');
      assert.strictEqual(elt.getAttribute('class'), 'testclass1');

      myp5.select('#testdiv').toggleClass('testclass2');
      assert.strictEqual(elt.getAttribute('class'), 'testclass1 testclass2');
    });
  });
});
