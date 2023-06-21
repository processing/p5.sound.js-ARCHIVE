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
// SHAPE | 2D Primitives
//////////////////////////////////////////////

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


export default p5.Renderer2D;
