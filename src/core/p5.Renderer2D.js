import p5 from './main';
import * as constants from './constants';

import './p5.Renderer';

/**
 * p5.Renderer2D
 * The 2D canvas renderer class.
 * extends p5.Renderer
 */
const styleEmpty = 'rgba(0,0,0,0)';
// const alphaThreshold = 0.00125; // minimum visible

p5.Renderer2D = function (elt, pInst, isMainCanvas) {
  p5.Renderer.call(this, elt, pInst, isMainCanvas);
  this.drawingContext = this.canvas.getContext('2d');
  this._pInst._setProperty('drawingContext', this.drawingContext);
  return this;
};

p5.Renderer2D.prototype = Object.create(p5.Renderer.prototype);

p5.Renderer2D.prototype._applyDefaults = function () {
  this._cachedFillStyle = this._cachedStrokeStyle = undefined;
  this._cachedBlendMode = constants.BLEND;
  this._setFill(constants._DEFAULT_FILL);
  this._setStroke(constants._DEFAULT_STROKE);
  this.drawingContext.lineCap = constants.ROUND;
  this.drawingContext.font = 'normal 12px sans-serif';
};

p5.Renderer2D.prototype.resize = function (w, h) {
  p5.Renderer.prototype.resize.call(this, w, h);
  this.drawingContext.scale(
    this._pInst._pixelDensity,
    this._pInst._pixelDensity
  );
};

//////////////////////////////////////////////
// COLOR | Setting
//////////////////////////////////////////////

p5.Renderer2D.prototype.background = function (...args) {
  this.drawingContext.save();

  const curFill = this._getFill();
  // create background rect
  const color = this._pInst.color(...args);

  const newFill = color.toString();
  this._setFill(newFill);

  this.drawingContext.fillRect(0, 0, this.width, this.height);
  // reset fill
  this._setFill(curFill);

  this.drawingContext.restore();
};

p5.Renderer2D.prototype.clear = function () {
  this.drawingContext.save();

  this.drawingContext.clearRect(0, 0, this.width, this.height);
  this.drawingContext.restore();
};

p5.Renderer2D.prototype.fill = function (...args) {
  const color = this._pInst.color(...args);
  this._setFill(color.toString());

};

p5.Renderer2D.prototype.stroke = function (...args) {
  const color = this._pInst.color(...args);
  this._setStroke(color.toString());


};

//////////////////////////////////////////////
// IMAGE | Pixels
//////////////////////////////////////////////

p5.Renderer2D.prototype.set = function (x, y, imgOrCol) {
  // round down to get integer numbers
  x = Math.floor(x);
  y = Math.floor(y);
  const pixelsState = this._pixelsState;
  let r = 0,
    g = 0,
    b = 0,
    a = 0;
  let idx =
    4 *
    (y *
      pixelsState._pixelDensity *
      (this.width * pixelsState._pixelDensity) +
      x * pixelsState._pixelDensity);
  if (!pixelsState.imageData) {
    pixelsState.loadPixels.call(pixelsState);
  }
  if (typeof imgOrCol === 'number') {
    if (idx < pixelsState.pixels.length) {
      r = imgOrCol;
      g = imgOrCol;
      b = imgOrCol;
      a = 255;
      //this.updatePixels.call(this);
    }
  } else if (imgOrCol instanceof Array) {
    if (imgOrCol.length < 4) {
      throw new Error('pixel array must be of the form [R, G, B, A]');
    }
    if (idx < pixelsState.pixels.length) {
      r = imgOrCol[0];
      g = imgOrCol[1];
      b = imgOrCol[2];
      a = imgOrCol[3];
      //this.updatePixels.call(this);
    }
  } else if (imgOrCol instanceof p5.Color) {
    if (idx < pixelsState.pixels.length) {
      r = imgOrCol.levels[0];
      g = imgOrCol.levels[1];
      b = imgOrCol.levels[2];
      a = imgOrCol.levels[3];
      //this.updatePixels.call(this);
    }
  }
  // loop over pixelDensity * pixelDensity
  for (let i = 0; i < pixelsState._pixelDensity; i++) {
    for (let j = 0; j < pixelsState._pixelDensity; j++) {
      // loop over
      idx =
        4 *
        ((y * pixelsState._pixelDensity + j) *
          this.width *
          pixelsState._pixelDensity +
          (x * pixelsState._pixelDensity + i));
      pixelsState.pixels[idx] = r;
      pixelsState.pixels[idx + 1] = g;
      pixelsState.pixels[idx + 2] = b;
      pixelsState.pixels[idx + 3] = a;
    }
  }
};

p5.Renderer2D.prototype.updatePixels = function (x, y, w, h) {
  const pixelsState = this._pixelsState;
  const pd = pixelsState._pixelDensity;
  if (
    x === undefined &&
    y === undefined &&
    w === undefined &&
    h === undefined
  ) {
    x = 0;
    y = 0;
    w = this.width;
    h = this.height;
  }
  x *= pd;
  y *= pd;
  w *= pd;
  h *= pd;

  this.drawingContext.putImageData(pixelsState.imageData, x, y, 0, 0, w, h);
};

//////////////////////////////////////////////
// SHAPE | 2D Primitives
//////////////////////////////////////////////

/**
 * Generate a cubic Bezier representing an arc on the unit circle of total
 * angle `size` radians, beginning `start` radians above the x-axis. Up to
 * four of these curves are combined to make a full arc.
 *
 * See ecridge.com/bezier.pdf for an explanation of the method.
 */
p5.Renderer2D.prototype._acuteArcToBezier = function _acuteArcToBezier(
  start,
  size
) {
  // Evaluate constants.
  const alpha = size / 2.0,
    cos_alpha = Math.cos(alpha),
    sin_alpha = Math.sin(alpha),
    cot_alpha = 1.0 / Math.tan(alpha),
    // This is how far the arc needs to be rotated.
    phi = start + alpha,
    cos_phi = Math.cos(phi),
    sin_phi = Math.sin(phi),
    lambda = (4.0 - cos_alpha) / 3.0,
    mu = sin_alpha + (cos_alpha - lambda) * cot_alpha;

  // Return rotated waypoints.
  return {
    ax: Math.cos(start).toFixed(7),
    ay: Math.sin(start).toFixed(7),
    bx: (lambda * cos_phi + mu * sin_phi).toFixed(7),
    by: (lambda * sin_phi - mu * cos_phi).toFixed(7),
    cx: (lambda * cos_phi - mu * sin_phi).toFixed(7),
    cy: (lambda * sin_phi + mu * cos_phi).toFixed(7),
    dx: Math.cos(start + size).toFixed(7),
    dy: Math.sin(start + size).toFixed(7)
  };
};

/*
 * This function requires that:
 *
 *   0 <= start < TWO_PI
 *
 *   start <= stop < start + TWO_PI
 */

p5.Renderer2D.prototype.ellipse = function (args) {
  const ctx = this.drawingContext;
  const doFill = this._doFill,
    doStroke = this._doStroke;
  const x = parseFloat(args[0]),
    y = parseFloat(args[1]),
    w = parseFloat(args[2]),
    h = parseFloat(args[3]);
  if (doFill && !doStroke) {
    if (this._getFill() === styleEmpty) {
      return this;
    }
  } else if (!doFill && doStroke) {
    if (this._getStroke() === styleEmpty) {
      return this;
    }
  }
  const kappa = 0.5522847498,
    // control point offset horizontal
    ox = w / 2 * kappa,
    // control point offset vertical
    oy = h / 2 * kappa,
    // x-end
    xe = x + w,
    // y-end
    ye = y + h,
    // x-middle
    xm = x + w / 2,
    ym = y + h / 2; // y-middle
  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  if (doFill) {
    ctx.fill();
  }
  if (doStroke) {
    ctx.stroke();
  }
};

p5.Renderer2D.prototype.endShape = function (
  mode,
  vertices,
  isCurve,
  isBezier,
  isQuadratic,
  isContour,
  shapeKind
) {
  if (vertices.length === 0) {
    return this;
  }
  if (!this._doStroke && !this._doFill) {
    return this;
  }
  const closeShape = mode === constants.CLOSE;
  let v;
  if (closeShape && !isContour) {
    vertices.push(vertices[0]);
  }
  let i, j;
  const numVerts = vertices.length;
  if (isCurve && (shapeKind === constants.POLYGON || shapeKind === null)) {
    if (numVerts > 3) {
      const b = [],
        s = 1 - this._curveTightness;
      this.drawingContext.beginPath();
      this.drawingContext.moveTo(vertices[1][0], vertices[1][1]);
      for (i = 1; i + 2 < numVerts; i++) {
        v = vertices[i];
        b[0] = [v[0], v[1]];
        b[1] = [
          v[0] + (s * vertices[i + 1][0] - s * vertices[i - 1][0]) / 6,
          v[1] + (s * vertices[i + 1][1] - s * vertices[i - 1][1]) / 6
        ];
        b[2] = [
          vertices[i + 1][0] +
          (s * vertices[i][0] - s * vertices[i + 2][0]) / 6,
          vertices[i + 1][1] + (s * vertices[i][1] - s * vertices[i + 2][1]) / 6
        ];
        b[3] = [vertices[i + 1][0], vertices[i + 1][1]];
        this.drawingContext.bezierCurveTo(
          b[1][0],
          b[1][1],
          b[2][0],
          b[2][1],
          b[3][0],
          b[3][1]
        );
      }
      if (closeShape) {
        this.drawingContext.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
      }
      this._doFillStrokeClose(closeShape);
    }
  } else if (
    isBezier &&
    (shapeKind === constants.POLYGON || shapeKind === null)
  ) {
    this.drawingContext.beginPath();
    for (i = 0; i < numVerts; i++) {
      if (vertices[i].isVert) {
        if (vertices[i].moveTo) {
          this.drawingContext.moveTo(vertices[i][0], vertices[i][1]);
        } else {
          this.drawingContext.lineTo(vertices[i][0], vertices[i][1]);
        }
      } else {
        this.drawingContext.bezierCurveTo(
          vertices[i][0],
          vertices[i][1],
          vertices[i][2],
          vertices[i][3],
          vertices[i][4],
          vertices[i][5]
        );
      }
    }
    this._doFillStrokeClose(closeShape);
  } else if (
    isQuadratic &&
    (shapeKind === constants.POLYGON || shapeKind === null)
  ) {
    this.drawingContext.beginPath();
    for (i = 0; i < numVerts; i++) {
      if (vertices[i].isVert) {
        if (vertices[i].moveTo) {
          this.drawingContext.moveTo(vertices[i][0], vertices[i][1]);
        } else {
          this.drawingContext.lineTo(vertices[i][0], vertices[i][1]);
        }
      } else {
        this.drawingContext.quadraticCurveTo(
          vertices[i][0],
          vertices[i][1],
          vertices[i][2],
          vertices[i][3]
        );
      }
    }
    this._doFillStrokeClose(closeShape);
  } else {
    if (shapeKind === constants.POINTS) {
      for (i = 0; i < numVerts; i++) {
        v = vertices[i];
        if (this._doStroke) {
          this._pInst.stroke(v[6]);
        }
        this._pInst.point(v[0], v[1]);
      }
    } else if (shapeKind === constants.LINES) {
      for (i = 0; i + 1 < numVerts; i += 2) {
        v = vertices[i];
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 1][6]);
        }
        this._pInst.line(v[0], v[1], vertices[i + 1][0], vertices[i + 1][1]);
      }
    } else if (shapeKind === constants.TRIANGLES) {
      for (i = 0; i + 2 < numVerts; i += 3) {
        v = vertices[i];
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(v[0], v[1]);
        this.drawingContext.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
        this.drawingContext.lineTo(vertices[i + 2][0], vertices[i + 2][1]);
        this.drawingContext.closePath();
        if (this._doFill) {
          this._pInst.fill(vertices[i + 2][5]);
          this.drawingContext.fill();
        }
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 2][6]);
          this.drawingContext.stroke();
        }
      }
    } else if (shapeKind === constants.TRIANGLE_STRIP) {
      for (i = 0; i + 1 < numVerts; i++) {
        v = vertices[i];
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(vertices[i + 1][0], vertices[i + 1][1]);
        this.drawingContext.lineTo(v[0], v[1]);
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 1][6]);
        }
        if (this._doFill) {
          this._pInst.fill(vertices[i + 1][5]);
        }
        if (i + 2 < numVerts) {
          this.drawingContext.lineTo(vertices[i + 2][0], vertices[i + 2][1]);
          if (this._doStroke) {
            this._pInst.stroke(vertices[i + 2][6]);
          }
          if (this._doFill) {
            this._pInst.fill(vertices[i + 2][5]);
          }
        }
        this._doFillStrokeClose(closeShape);
      }
    } else if (shapeKind === constants.TRIANGLE_FAN) {
      if (numVerts > 2) {
        // For performance reasons, try to batch as many of the
        // fill and stroke calls as possible.
        this.drawingContext.beginPath();
        for (i = 2; i < numVerts; i++) {
          v = vertices[i];
          this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
          this.drawingContext.lineTo(vertices[i - 1][0], vertices[i - 1][1]);
          this.drawingContext.lineTo(v[0], v[1]);
          this.drawingContext.lineTo(vertices[0][0], vertices[0][1]);
          // If the next colour is going to be different, stroke / fill now
          if (i < numVerts - 1) {
            if (
              (this._doFill && v[5] !== vertices[i + 1][5]) ||
              (this._doStroke && v[6] !== vertices[i + 1][6])
            ) {
              if (this._doFill) {
                this._pInst.fill(v[5]);
                this.drawingContext.fill();
                this._pInst.fill(vertices[i + 1][5]);
              }
              if (this._doStroke) {
                this._pInst.stroke(v[6]);
                this.drawingContext.stroke();
                this._pInst.stroke(vertices[i + 1][6]);
              }
              this.drawingContext.closePath();
              this.drawingContext.beginPath(); // Begin the next one
            }
          }
        }
        this._doFillStrokeClose(closeShape);
      }
    } else if (shapeKind === constants.QUADS) {
      for (i = 0; i + 3 < numVerts; i += 4) {
        v = vertices[i];
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(v[0], v[1]);
        for (j = 1; j < 4; j++) {
          this.drawingContext.lineTo(vertices[i + j][0], vertices[i + j][1]);
        }
        this.drawingContext.lineTo(v[0], v[1]);
        if (this._doFill) {
          this._pInst.fill(vertices[i + 3][5]);
        }
        if (this._doStroke) {
          this._pInst.stroke(vertices[i + 3][6]);
        }
        this._doFillStrokeClose(closeShape);
      }
    } else if (shapeKind === constants.QUAD_STRIP) {
      if (numVerts > 3) {
        for (i = 0; i + 1 < numVerts; i += 2) {
          v = vertices[i];
          this.drawingContext.beginPath();
          if (i + 3 < numVerts) {
            this.drawingContext.moveTo(vertices[i + 2][0], vertices[i + 2][1]);
            this.drawingContext.lineTo(v[0], v[1]);
            this.drawingContext.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
            this.drawingContext.lineTo(vertices[i + 3][0], vertices[i + 3][1]);
            if (this._doFill) {
              this._pInst.fill(vertices[i + 3][5]);
            }
            if (this._doStroke) {
              this._pInst.stroke(vertices[i + 3][6]);
            }
          } else {
            this.drawingContext.moveTo(v[0], v[1]);
            this.drawingContext.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
          }
          this._doFillStrokeClose(closeShape);
        }
      }
    } else {
      this.drawingContext.beginPath();
      this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
      for (i = 1; i < numVerts; i++) {
        v = vertices[i];
        if (v.isVert) {
          if (v.moveTo) {
            this.drawingContext.moveTo(v[0], v[1]);
          } else {
            this.drawingContext.lineTo(v[0], v[1]);
          }
        }
      }
      this._doFillStrokeClose(closeShape);
    }
  }
  isCurve = false;
  isBezier = false;
  isQuadratic = false;
  isContour = false;
  if (closeShape) {
    vertices.pop();
  }

  return this;
};
//////////////////////////////////////////////
// SHAPE | Attributes
//////////////////////////////////////////////

p5.Renderer2D.prototype.strokeCap = function (cap) {
  if (
    cap === constants.ROUND ||
    cap === constants.SQUARE ||
    cap === constants.PROJECT
  ) {
    this.drawingContext.lineCap = cap;
  }
  return this;
};

p5.Renderer2D.prototype.strokeJoin = function (join) {
  if (
    join === constants.ROUND ||
    join === constants.BEVEL ||
    join === constants.MITER
  ) {
    this.drawingContext.lineJoin = join;
  }
  return this;
};

p5.Renderer2D.prototype.strokeWeight = function (w) {
  if (typeof w === 'undefined' || w === 0) {
    // hack because lineWidth 0 doesn't work
    this.drawingContext.lineWidth = 0.0001;
  } else {
    this.drawingContext.lineWidth = w;
  }
  return this;
};

p5.Renderer2D.prototype._getFill = function () {
  if (!this._cachedFillStyle) {
    this._cachedFillStyle = this.drawingContext.fillStyle;
  }
  return this._cachedFillStyle;
};

p5.Renderer2D.prototype._setFill = function (fillStyle) {
  if (fillStyle !== this._cachedFillStyle) {
    this.drawingContext.fillStyle = fillStyle;
    this._cachedFillStyle = fillStyle;
  }
};

p5.Renderer2D.prototype._getStroke = function () {
  if (!this._cachedStrokeStyle) {
    this._cachedStrokeStyle = this.drawingContext.strokeStyle;
  }
  return this._cachedStrokeStyle;
};

p5.Renderer2D.prototype._setStroke = function (strokeStyle) {
  if (strokeStyle !== this._cachedStrokeStyle) {
    this.drawingContext.strokeStyle = strokeStyle;
    this._cachedStrokeStyle = strokeStyle;
  }
};

//////////////////////////////////////////////
// SHAPE | Curves
//////////////////////////////////////////////
p5.Renderer2D.prototype.bezier = function (x1, y1, x2, y2, x3, y3, x4, y4) {
  this._pInst.beginShape();
  this._pInst.vertex(x1, y1);
  this._pInst.bezierVertex(x2, y2, x3, y3, x4, y4);
  this._pInst.endShape();
  return this;
};

p5.Renderer2D.prototype.curve = function (x1, y1, x2, y2, x3, y3, x4, y4) {
  this._pInst.beginShape();
  this._pInst.curveVertex(x1, y1);
  this._pInst.curveVertex(x2, y2);
  this._pInst.curveVertex(x3, y3);
  this._pInst.curveVertex(x4, y4);
  this._pInst.endShape();
  return this;
};

//////////////////////////////////////////////
// SHAPE | Vertex
//////////////////////////////////////////////

p5.Renderer2D.prototype._doFillStrokeClose = function (closeShape) {
  if (closeShape) {
    this.drawingContext.closePath();
  }
  if (this._doFill) {
    this.drawingContext.fill();
  }
  if (this._doStroke) {
    this.drawingContext.stroke();
  }
};

//////////////////////////////////////////////
// STRUCTURE
//////////////////////////////////////////////

// a push() operation is in progress.
// the renderer should return a 'style' object that it wishes to
// store on the push stack.
// derived renderers should call the base class' push() method
// to fetch the base style object.
p5.Renderer2D.prototype.push = function () {
  this.drawingContext.save();

  // get the base renderer style
  return p5.Renderer.prototype.push.apply(this);
};

// a pop() operation is in progress
// the renderer is passed the 'style' object that it returned
// from its push() method.
// derived renderers should pass this object to their base
// class' pop method
p5.Renderer2D.prototype.pop = function (style) {
  this.drawingContext.restore();
  // Re-cache the fill / stroke state
  this._cachedFillStyle = this.drawingContext.fillStyle;
  this._cachedStrokeStyle = this.drawingContext.strokeStyle;

  p5.Renderer.prototype.pop.call(this, style);
};

export default p5.Renderer2D;
