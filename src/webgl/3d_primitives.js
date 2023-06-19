/**
 * @module Shape
 * @submodule 3D Primitives
 * @for p5
 * @requires core
 * @requires p5.Geometry
 */

import p5 from '../core/main';
import './p5.Geometry';
import * as constants from '../core/constants';


///////////////////////
/// 2D primitives
/////////////////////////

/**
 * Draws a point, a coordinate in space at the dimension of one pixel,
 * given x, y and z coordinates. The color of the point is determined
 * by the current stroke, while the point size is determined by current
 * stroke weight.
 * @private
 * @param {Number} x x-coordinate of point
 * @param {Number} y y-coordinate of point
 * @param {Number} z z-coordinate of point
 * @chainable
 * @example
 * <div>
 * <code>
 * function setup() {
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw() {
 *   background(50);
 *   stroke(255);
 *   strokeWeight(4);
 *   point(25, 0);
 *   strokeWeight(3);
 *   point(-25, 0);
 *   strokeWeight(2);
 *   point(0, 25);
 *   strokeWeight(1);
 *   point(0, -25);
 * }
 * </code>
 * </div>
 */
p5.RendererGL.prototype.point = function(x, y, z) {
  if (typeof z === 'undefined') {
    z = 0;
  }

  const _vertex = [];
  _vertex.push(new p5.Vector(x, y, z));
  this._drawPoints(_vertex, this.immediateMode.buffers.point);

  return this;
};

p5.RendererGL.prototype.triangle = function(args) {
  const x1 = args[0],
    y1 = args[1];
  const x2 = args[2],
    y2 = args[3];
  const x3 = args[4],
    y3 = args[5];

  const gId = 'tri';
  if (!this.geometryInHash(gId)) {
    const _triangle = function() {
      const vertices = [];
      vertices.push(new p5.Vector(0, 0, 0));
      vertices.push(new p5.Vector(1, 0, 0));
      vertices.push(new p5.Vector(0, 1, 0));
      this.edges = [[0, 1], [1, 2], [2, 0]];
      this.vertices = vertices;
      this.faces = [[0, 1, 2]];
      this.uvs = [0, 0, 1, 0, 1, 1];
    };
    const triGeom = new p5.Geometry(1, 1, _triangle);
    triGeom._edgesToVertices();
    triGeom.computeNormals();
    this.createBuffers(gId, triGeom);
  }

  // only one triangle is cached, one point is at the origin, and the
  // two adjacent sides are tne unit vectors along the X & Y axes.
  //
  // this matrix multiplication transforms those two unit vectors
  // onto the required vector prior to rendering, and moves the
  // origin appropriately.
  const uMVMatrix = this.uMVMatrix.copy();
  try {
    const mult = new p5.Matrix([
      x2 - x1, y2 - y1, 0, 0, // the resulting unit X-axis
      x3 - x1, y3 - y1, 0, 0, // the resulting unit Y-axis
      0, 0, 1, 0,             // the resulting unit Z-axis (unchanged)
      x1, y1, 0, 1            // the resulting origin
    ]).mult(this.uMVMatrix);

    this.uMVMatrix = mult;

    this.drawBuffers(gId);
  } finally {
    this.uMVMatrix = uMVMatrix;
  }

  return this;
};

p5.RendererGL.prototype.ellipse = function(args) {
  this.arc(
    args[0],
    args[1],
    args[2],
    args[3],
    0,
    constants.TWO_PI,
    constants.OPEN,
    args[4]
  );
};

p5.RendererGL.prototype.arc = function(args) {
  const x = arguments[0];
  const y = arguments[1];
  const width = arguments[2];
  const height = arguments[3];
  const start = arguments[4];
  const stop = arguments[5];
  const mode = arguments[6];
  const detail = arguments[7] || 25;

  let shape;
  let gId;

  // check if it is an ellipse or an arc
  if (Math.abs(stop - start) >= constants.TWO_PI) {
    shape = 'ellipse';
    gId = `${shape}|${detail}|`;
  } else {
    shape = 'arc';
    gId = `${shape}|${start}|${stop}|${mode}|${detail}|`;
  }

  if (!this.geometryInHash(gId)) {
    const _arc = function() {

      // if the start and stop angles are not the same, push vertices to the array
      if (start.toFixed(10) !== stop.toFixed(10)) {
        // if the mode specified is PIE or null, push the mid point of the arc in vertices
        if (mode === constants.PIE || typeof mode === 'undefined') {
          this.vertices.push(new p5.Vector(0.5, 0.5, 0));
          this.uvs.push([0.5, 0.5]);
        }

        // vertices for the perimeter of the circle
        for (let i = 0; i <= detail; i++) {
          const u = i / detail;
          const theta = (stop - start) * u + start;

          const _x = 0.5 + Math.cos(theta) / 2;
          const _y = 0.5 + Math.sin(theta) / 2;

          this.vertices.push(new p5.Vector(_x, _y, 0));
          this.uvs.push([_x, _y]);

          if (i < detail - 1) {
            this.faces.push([0, i + 1, i + 2]);
            this.edges.push([i + 1, i + 2]);
          }
        }

        // check the mode specified in order to push vertices and faces, different for each mode
        switch (mode) {
          case constants.PIE:
            this.faces.push([
              0,
              this.vertices.length - 2,
              this.vertices.length - 1
            ]);
            this.edges.push([0, 1]);
            this.edges.push([
              this.vertices.length - 2,
              this.vertices.length - 1
            ]);
            this.edges.push([0, this.vertices.length - 1]);
            break;

          case constants.CHORD:
            this.edges.push([0, 1]);
            this.edges.push([0, this.vertices.length - 1]);
            break;

          case constants.OPEN:
            this.edges.push([0, 1]);
            break;

          default:
            this.faces.push([
              0,
              this.vertices.length - 2,
              this.vertices.length - 1
            ]);
            this.edges.push([
              this.vertices.length - 2,
              this.vertices.length - 1
            ]);
        }
      }
    };

    const arcGeom = new p5.Geometry(detail, 1, _arc);
    arcGeom.computeNormals();

    if (detail <= 50) {
      arcGeom._edgesToVertices(arcGeom);
    } else if (this._doStroke) {
      console.log(
        `Cannot apply a stroke to an ${shape} with more than 50 detail`
      );
    }

    this.createBuffers(gId, arcGeom);
  }

  const uMVMatrix = this.uMVMatrix.copy();

  try {
    this.uMVMatrix.translate([x, y, 0]);
    this.uMVMatrix.scale(width, height, 1);

    this.drawBuffers(gId);
  } finally {
    this.uMVMatrix = uMVMatrix;
  }

  return this;
};

p5.RendererGL.prototype.rect = function(args) {
  const x = args[0];
  const y = args[1];
  const width = args[2];
  const height = args[3];

  if (typeof args[4] === 'undefined') {
    // Use the retained mode for drawing rectangle,
    // if args for rounding rectangle is not provided by user.
    const perPixelLighting = this._pInst._glAttributes.perPixelLighting;
    const detailX = args[4] || (perPixelLighting ? 1 : 24);
    const detailY = args[5] || (perPixelLighting ? 1 : 16);
    const gId = `rect|${detailX}|${detailY}`;
    if (!this.geometryInHash(gId)) {
      const _rect = function() {
        for (let i = 0; i <= this.detailY; i++) {
          const v = i / this.detailY;
          for (let j = 0; j <= this.detailX; j++) {
            const u = j / this.detailX;
            const p = new p5.Vector(u, v, 0);
            this.vertices.push(p);
            this.uvs.push(u, v);
          }
        }
        // using stroke indices to avoid stroke over face(s) of rectangle
        if (detailX > 0 && detailY > 0) {
          this.edges = [
            [0, detailX],
            [detailX, (detailX + 1) * (detailY + 1) - 1],
            [(detailX + 1) * (detailY + 1) - 1, (detailX + 1) * detailY],
            [(detailX + 1) * detailY, 0]
          ];
        }
      };
      const rectGeom = new p5.Geometry(detailX, detailY, _rect);
      rectGeom
        .computeFaces()
        .computeNormals()
        ._edgesToVertices();
      this.createBuffers(gId, rectGeom);
    }

    // only a single rectangle (of a given detail) is cached: a square with
    // opposite corners at (0,0) & (1,1).
    //
    // before rendering, this square is scaled & moved to the required location.
    const uMVMatrix = this.uMVMatrix.copy();
    try {
      this.uMVMatrix.translate([x, y, 0]);
      this.uMVMatrix.scale(width, height, 1);

      this.drawBuffers(gId);
    } finally {
      this.uMVMatrix = uMVMatrix;
    }
  } else {
    // Use Immediate mode to round the rectangle corner,
    // if args for rounding corners is provided by user
    let tl = args[4];
    let tr = typeof args[5] === 'undefined' ? tl : args[5];
    let br = typeof args[6] === 'undefined' ? tr : args[6];
    let bl = typeof args[7] === 'undefined' ? br : args[7];

    let a = x;
    let b = y;
    let c = width;
    let d = height;

    c += a;
    d += b;

    if (a > c) {
      const temp = a;
      a = c;
      c = temp;
    }

    if (b > d) {
      const temp = b;
      b = d;
      d = temp;
    }

    const maxRounding = Math.min((c - a) / 2, (d - b) / 2);
    if (tl > maxRounding) tl = maxRounding;
    if (tr > maxRounding) tr = maxRounding;
    if (br > maxRounding) br = maxRounding;
    if (bl > maxRounding) bl = maxRounding;

    let x1 = a;
    let y1 = b;
    let x2 = c;
    let y2 = d;

    this.beginShape();
    if (tr !== 0) {
      this.vertex(x2 - tr, y1);
      this.quadraticVertex(x2, y1, x2, y1 + tr);
    } else {
      this.vertex(x2, y1);
    }
    if (br !== 0) {
      this.vertex(x2, y2 - br);
      this.quadraticVertex(x2, y2, x2 - br, y2);
    } else {
      this.vertex(x2, y2);
    }
    if (bl !== 0) {
      this.vertex(x1 + bl, y2);
      this.quadraticVertex(x1, y2, x1, y2 - bl);
    } else {
      this.vertex(x1, y2);
    }
    if (tl !== 0) {
      this.vertex(x1, y1 + tl);
      this.quadraticVertex(x1, y1, x1 + tl, y1);
    } else {
      this.vertex(x1, y1);
    }

    this.immediateMode.geometry.uvs.length = 0;
    for (const vert of this.immediateMode.geometry.vertices) {
      const u = (vert.x - x1) / width;
      const v = (vert.y - y1) / height;
      this.immediateMode.geometry.uvs.push(u, v);
    }

    this.endShape(constants.CLOSE);
  }
  return this;
};

/* eslint-disable max-len */
p5.RendererGL.prototype.quad = function(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, detailX, detailY) {
/* eslint-enable max-len */
  if (typeof detailX === 'undefined') {
    detailX = 2;
  }
  if (typeof detailY === 'undefined') {
    detailY = 2;
  }

  const gId =
    `quad|${x1}|${y1}|${z1}|${x2}|${y2}|${z2}|${x3}|${y3}|${z3}|${x4}|${y4}|${z4}|${detailX}|${detailY}`;

  if (!this.geometryInHash(gId)) {
    const quadGeom = new p5.Geometry(detailX, detailY, function() {
      //algorithm adapted from c++ to js
      let xRes = 1.0 / (this.detailX - 1);
      let yRes = 1.0 / (this.detailY - 1);
      for (let y = 0; y < this.detailY; y++) {
        for (let x = 0; x < this.detailX; x++) {
          let pctx = x * xRes;
          let pcty = y * yRes;

          let linePt0x = (1 - pcty) * x1 + pcty * x4;
          let linePt0y = (1 - pcty) * y1 + pcty * y4;
          let linePt0z = (1 - pcty) * z1 + pcty * z4;
          let linePt1x = (1 - pcty) * x2 + pcty * x3;
          let linePt1y = (1 - pcty) * y2 + pcty * y3;
          let linePt1z = (1 - pcty) * z2 + pcty * z3;

          let ptx = (1 - pctx) * linePt0x + pctx * linePt1x;
          let pty = (1 - pctx) * linePt0y + pctx * linePt1y;
          let ptz = (1 - pctx) * linePt0z + pctx * linePt1z;

          this.vertices.push(new p5.Vector(ptx, pty, ptz));
          this.uvs.push([pctx, pcty]);
        }
      }
    });

    quadGeom.faces = [];
    for(let y = 0; y < detailY-1; y++){
      for(let x = 0; x < detailX-1; x++){
        let pt0 = x + y * detailX;
        let pt1 = (x + 1) + y * detailX;
        let pt2 = (x + 1) + (y + 1) * detailX;
        let pt3 = x + (y + 1) * detailX;
        quadGeom.faces.push([pt0, pt1, pt2]);
        quadGeom.faces.push([pt0, pt2, pt3]);
      }
    }
    quadGeom
      .computeNormals()
      ._makeTriangleEdges()
      ._edgesToVertices();
    this.createBuffers(gId, quadGeom);
  }
  this.drawBuffers(gId);
  return this;
};

//this implementation of bezier curve
//is based on Bernstein polynomial
// pretier-ignore
p5.RendererGL.prototype.bezier = function(
  x1,
  y1,
  z1, // x2
  x2, // y2
  y2, // x3
  z2, // y3
  x3, // x4
  y3, // y4
  z3,
  x4,
  y4,
  z4
) {
  if (arguments.length === 8) {
    y4 = y3;
    x4 = x3;
    y3 = z2;
    x3 = y2;
    y2 = x2;
    x2 = z1;
    z1 = z2 = z3 = z4 = 0;
  }
  const bezierDetail = this._pInst._bezierDetail || 20; //value of Bezier detail
  this.beginShape();
  for (let i = 0; i <= bezierDetail; i++) {
    const c1 = Math.pow(1 - i / bezierDetail, 3);
    const c2 = 3 * (i / bezierDetail) * Math.pow(1 - i / bezierDetail, 2);
    const c3 = 3 * Math.pow(i / bezierDetail, 2) * (1 - i / bezierDetail);
    const c4 = Math.pow(i / bezierDetail, 3);
    this.vertex(
      x1 * c1 + x2 * c2 + x3 * c3 + x4 * c4,
      y1 * c1 + y2 * c2 + y3 * c3 + y4 * c4,
      z1 * c1 + z2 * c2 + z3 * c3 + z4 * c4
    );
  }
  this.endShape();
  return this;
};

// pretier-ignore
p5.RendererGL.prototype.curve = function(
  x1,
  y1,
  z1, // x2
  x2, // y2
  y2, // x3
  z2, // y3
  x3, // x4
  y3, // y4
  z3,
  x4,
  y4,
  z4
) {
  if (arguments.length === 8) {
    x4 = x3;
    y4 = y3;
    x3 = y2;
    y3 = x2;
    x2 = z1;
    y2 = x2;
    z1 = z2 = z3 = z4 = 0;
  }
  const curveDetail = this._pInst._curveDetail;
  this.beginShape();
  for (let i = 0; i <= curveDetail; i++) {
    const c1 = Math.pow(i / curveDetail, 3) * 0.5;
    const c2 = Math.pow(i / curveDetail, 2) * 0.5;
    const c3 = i / curveDetail * 0.5;
    const c4 = 0.5;
    const vx =
      c1 * (-x1 + 3 * x2 - 3 * x3 + x4) +
      c2 * (2 * x1 - 5 * x2 + 4 * x3 - x4) +
      c3 * (-x1 + x3) +
      c4 * (2 * x2);
    const vy =
      c1 * (-y1 + 3 * y2 - 3 * y3 + y4) +
      c2 * (2 * y1 - 5 * y2 + 4 * y3 - y4) +
      c3 * (-y1 + y3) +
      c4 * (2 * y2);
    const vz =
      c1 * (-z1 + 3 * z2 - 3 * z3 + z4) +
      c2 * (2 * z1 - 5 * z2 + 4 * z3 - z4) +
      c3 * (-z1 + z3) +
      c4 * (2 * z2);
    this.vertex(vx, vy, vz);
  }
  this.endShape();
  return this;
};

/**
 * Draw a line given two points
 * @private
 * @param {Number} x0 x-coordinate of first vertex
 * @param {Number} y0 y-coordinate of first vertex
 * @param {Number} z0 z-coordinate of first vertex
 * @param {Number} x1 x-coordinate of second vertex
 * @param {Number} y1 y-coordinate of second vertex
 * @param {Number} z1 z-coordinate of second vertex
 * @chainable
 * @example
 * <div>
 * <code>
 * //draw a line
 * function setup() {
 *   createCanvas(100, 100, WEBGL);
 * }
 *
 * function draw() {
 *   background(200);
 *   rotateX(frameCount * 0.01);
 *   rotateY(frameCount * 0.01);
 *   // Use fill instead of stroke to change the color of shape.
 *   fill(255, 0, 0);
 *   line(10, 10, 0, 60, 60, 20);
 * }
 * </code>
 * </div>
 */
p5.RendererGL.prototype.line = function(...args) {
  if (args.length === 6) {
    this.beginShape(constants.LINES);
    this.vertex(args[0], args[1], args[2]);
    this.vertex(args[3], args[4], args[5]);
    this.endShape();
  } else if (args.length === 4) {
    this.beginShape(constants.LINES);
    this.vertex(args[0], args[1], 0);
    this.vertex(args[2], args[3], 0);
    this.endShape();
  }
  return this;
};

p5.RendererGL.prototype.bezierVertex = function(...args) {
  if (this.immediateMode._bezierVertex.length === 0) {
    throw Error('vertex() must be used once before calling bezierVertex()');
  } else {
    let w_x = [];
    let w_y = [];
    let w_z = [];
    let t, _x, _y, _z, i, k, m;
    // variable i for bezierPoints, k for components, and m for anchor points.
    const argLength = args.length;

    t = 0;

    if (
      this._lookUpTableBezier.length === 0 ||
      this._lutBezierDetail !== this._pInst._curveDetail
    ) {
      this._lookUpTableBezier = [];
      this._lutBezierDetail = this._pInst._curveDetail;
      const step = 1 / this._lutBezierDetail;
      let start = 0;
      let end = 1;
      let j = 0;
      while (start < 1) {
        t = parseFloat(start.toFixed(6));
        this._lookUpTableBezier[j] = this._bezierCoefficients(t);
        if (end.toFixed(6) === step.toFixed(6)) {
          t = parseFloat(end.toFixed(6)) + parseFloat(start.toFixed(6));
          ++j;
          this._lookUpTableBezier[j] = this._bezierCoefficients(t);
          break;
        }
        start += step;
        end -= step;
        ++j;
      }
    }

    const LUTLength = this._lookUpTableBezier.length;

    // fillColors[0]: start point color
    // fillColors[1],[2]: control point color
    // fillColors[3]: end point color
    const fillColors = [];
    for (m = 0; m < 4; m++) fillColors.push([]);
    fillColors[0] = this.immediateMode.geometry.vertexColors.slice(-4);
    fillColors[3] = this.curFillColor.slice();

    // Do the same for strokeColor.
    const strokeColors = [];
    for (m = 0; m < 4; m++) strokeColors.push([]);
    strokeColors[0] = this.immediateMode.geometry.vertexStrokeColors.slice(-4);
    strokeColors[3] = this.curStrokeColor.slice();

    if (argLength === 6) {
      this.isBezier = true;

      w_x = [this.immediateMode._bezierVertex[0], args[0], args[2], args[4]];
      w_y = [this.immediateMode._bezierVertex[1], args[1], args[3], args[5]];
      // The ratio of the distance between the start point, the two control-
      // points, and the end point determines the intermediate color.
      let d0 = Math.hypot(w_x[0]-w_x[1], w_y[0]-w_y[1]);
      let d1 = Math.hypot(w_x[1]-w_x[2], w_y[1]-w_y[2]);
      let d2 = Math.hypot(w_x[2]-w_x[3], w_y[2]-w_y[3]);
      const totalLength = d0 + d1 + d2;
      d0 /= totalLength;
      d2 /= totalLength;
      for (k = 0; k < 4; k++) {
        fillColors[1].push(
          fillColors[0][k] * (1-d0) + fillColors[3][k] * d0
        );
        fillColors[2].push(
          fillColors[0][k] * d2 + fillColors[3][k] * (1-d2)
        );
        strokeColors[1].push(
          strokeColors[0][k] * (1-d0) + strokeColors[3][k] * d0
        );
        strokeColors[2].push(
          strokeColors[0][k] * d2 + strokeColors[3][k] * (1-d2)
        );
      }

      for (i = 0; i < LUTLength; i++) {
        // Interpolate colors using control points
        this.curFillColor = [0, 0, 0, 0];
        this.curStrokeColor = [0, 0, 0, 0];
        _x = _y = 0;
        for (m = 0; m < 4; m++) {
          for (k = 0; k < 4; k++) {
            this.curFillColor[k] +=
              this._lookUpTableBezier[i][m] * fillColors[m][k];
            this.curStrokeColor[k] +=
              this._lookUpTableBezier[i][m] * strokeColors[m][k];
          }
          _x += w_x[m] * this._lookUpTableBezier[i][m];
          _y += w_y[m] * this._lookUpTableBezier[i][m];
        }
        this.vertex(_x, _y);
      }
      // so that we leave currentColor with the last value the user set it to
      this.curFillColor = fillColors[3];
      this.curStrokeColor = strokeColors[3];
      this.immediateMode._bezierVertex[0] = args[4];
      this.immediateMode._bezierVertex[1] = args[5];
    } else if (argLength === 9) {
      this.isBezier = true;

      w_x = [this.immediateMode._bezierVertex[0], args[0], args[3], args[6]];
      w_y = [this.immediateMode._bezierVertex[1], args[1], args[4], args[7]];
      w_z = [this.immediateMode._bezierVertex[2], args[2], args[5], args[8]];
      // The ratio of the distance between the start point, the two control-
      // points, and the end point determines the intermediate color.
      let d0 = Math.hypot(w_x[0]-w_x[1], w_y[0]-w_y[1], w_z[0]-w_z[1]);
      let d1 = Math.hypot(w_x[1]-w_x[2], w_y[1]-w_y[2], w_z[1]-w_z[2]);
      let d2 = Math.hypot(w_x[2]-w_x[3], w_y[2]-w_y[3], w_z[2]-w_z[3]);
      const totalLength = d0 + d1 + d2;
      d0 /= totalLength;
      d2 /= totalLength;
      for (k = 0; k < 4; k++) {
        fillColors[1].push(
          fillColors[0][k] * (1-d0) + fillColors[3][k] * d0
        );
        fillColors[2].push(
          fillColors[0][k] * d2 + fillColors[3][k] * (1-d2)
        );
        strokeColors[1].push(
          strokeColors[0][k] * (1-d0) + strokeColors[3][k] * d0
        );
        strokeColors[2].push(
          strokeColors[0][k] * d2 + strokeColors[3][k] * (1-d2)
        );
      }
      for (i = 0; i < LUTLength; i++) {
        // Interpolate colors using control points
        this.curFillColor = [0, 0, 0, 0];
        this.curStrokeColor = [0, 0, 0, 0];
        _x = _y = _z = 0;
        for (m = 0; m < 4; m++) {
          for (k = 0; k < 4; k++) {
            this.curFillColor[k] +=
              this._lookUpTableBezier[i][m] * fillColors[m][k];
            this.curStrokeColor[k] +=
              this._lookUpTableBezier[i][m] * strokeColors[m][k];
          }
          _x += w_x[m] * this._lookUpTableBezier[i][m];
          _y += w_y[m] * this._lookUpTableBezier[i][m];
          _z += w_z[m] * this._lookUpTableBezier[i][m];
        }
        this.vertex(_x, _y, _z);
      }
      // so that we leave currentColor with the last value the user set it to
      this.curFillColor = fillColors[3];
      this.curStrokeColor = strokeColors[3];
      this.immediateMode._bezierVertex[0] = args[6];
      this.immediateMode._bezierVertex[1] = args[7];
      this.immediateMode._bezierVertex[2] = args[8];
    }
  }
};

p5.RendererGL.prototype.quadraticVertex = function(...args) {
  if (this.immediateMode._quadraticVertex.length === 0) {
    throw Error('vertex() must be used once before calling quadraticVertex()');
  } else {
    let w_x = [];
    let w_y = [];
    let w_z = [];
    let t, _x, _y, _z, i, k, m;
    // variable i for bezierPoints, k for components, and m for anchor points.
    const argLength = args.length;

    t = 0;

    if (
      this._lookUpTableQuadratic.length === 0 ||
      this._lutQuadraticDetail !== this._pInst._curveDetail
    ) {
      this._lookUpTableQuadratic = [];
      this._lutQuadraticDetail = this._pInst._curveDetail;
      const step = 1 / this._lutQuadraticDetail;
      let start = 0;
      let end = 1;
      let j = 0;
      while (start < 1) {
        t = parseFloat(start.toFixed(6));
        this._lookUpTableQuadratic[j] = this._quadraticCoefficients(t);
        if (end.toFixed(6) === step.toFixed(6)) {
          t = parseFloat(end.toFixed(6)) + parseFloat(start.toFixed(6));
          ++j;
          this._lookUpTableQuadratic[j] = this._quadraticCoefficients(t);
          break;
        }
        start += step;
        end -= step;
        ++j;
      }
    }

    const LUTLength = this._lookUpTableQuadratic.length;

    // fillColors[0]: start point color
    // fillColors[1]: control point color
    // fillColors[2]: end point color
    const fillColors = [];
    for (m = 0; m < 3; m++) fillColors.push([]);
    fillColors[0] = this.immediateMode.geometry.vertexColors.slice(-4);
    fillColors[2] = this.curFillColor.slice();

    // Do the same for strokeColor.
    const strokeColors = [];
    for (m = 0; m < 3; m++) strokeColors.push([]);
    strokeColors[0] = this.immediateMode.geometry.vertexStrokeColors.slice(-4);
    strokeColors[2] = this.curStrokeColor.slice();

    if (argLength === 4) {
      this.isQuadratic = true;

      w_x = [this.immediateMode._quadraticVertex[0], args[0], args[2]];
      w_y = [this.immediateMode._quadraticVertex[1], args[1], args[3]];

      // The ratio of the distance between the start point, the control-
      // point, and the end point determines the intermediate color.
      let d0 = Math.hypot(w_x[0]-w_x[1], w_y[0]-w_y[1]);
      let d1 = Math.hypot(w_x[1]-w_x[2], w_y[1]-w_y[2]);
      const totalLength = d0 + d1;
      d0 /= totalLength;
      for (k = 0; k < 4; k++) {
        fillColors[1].push(
          fillColors[0][k] * (1-d0) + fillColors[2][k] * d0
        );
        strokeColors[1].push(
          strokeColors[0][k] * (1-d0) + strokeColors[2][k] * d0
        );
      }

      for (i = 0; i < LUTLength; i++) {
        // Interpolate colors using control points
        this.curFillColor = [0, 0, 0, 0];
        this.curStrokeColor = [0, 0, 0, 0];
        _x = _y = 0;
        for (m = 0; m < 3; m++) {
          for (k = 0; k < 4; k++) {
            this.curFillColor[k] +=
              this._lookUpTableQuadratic[i][m] * fillColors[m][k];
            this.curStrokeColor[k] +=
              this._lookUpTableQuadratic[i][m] * strokeColors[m][k];
          }
          _x += w_x[m] * this._lookUpTableQuadratic[i][m];
          _y += w_y[m] * this._lookUpTableQuadratic[i][m];
        }
        this.vertex(_x, _y);
      }

      // so that we leave currentColor with the last value the user set it to
      this.curFillColor = fillColors[2];
      this.curStrokeColor = strokeColors[2];
      this.immediateMode._quadraticVertex[0] = args[2];
      this.immediateMode._quadraticVertex[1] = args[3];
    } else if (argLength === 6) {
      this.isQuadratic = true;

      w_x = [this.immediateMode._quadraticVertex[0], args[0], args[3]];
      w_y = [this.immediateMode._quadraticVertex[1], args[1], args[4]];
      w_z = [this.immediateMode._quadraticVertex[2], args[2], args[5]];

      // The ratio of the distance between the start point, the control-
      // point, and the end point determines the intermediate color.
      let d0 = Math.hypot(w_x[0]-w_x[1], w_y[0]-w_y[1], w_z[0]-w_z[1]);
      let d1 = Math.hypot(w_x[1]-w_x[2], w_y[1]-w_y[2], w_z[1]-w_z[2]);
      const totalLength = d0 + d1;
      d0 /= totalLength;
      for (k = 0; k < 4; k++) {
        fillColors[1].push(
          fillColors[0][k] * (1-d0) + fillColors[2][k] * d0
        );
        strokeColors[1].push(
          strokeColors[0][k] * (1-d0) + strokeColors[2][k] * d0
        );
      }

      for (i = 0; i < LUTLength; i++) {
        // Interpolate colors using control points
        this.curFillColor = [0, 0, 0, 0];
        this.curStrokeColor = [0, 0, 0, 0];
        _x = _y = _z = 0;
        for (m = 0; m < 3; m++) {
          for (k = 0; k < 4; k++) {
            this.curFillColor[k] +=
              this._lookUpTableQuadratic[i][m] * fillColors[m][k];
            this.curStrokeColor[k] +=
              this._lookUpTableQuadratic[i][m] * strokeColors[m][k];
          }
          _x += w_x[m] * this._lookUpTableQuadratic[i][m];
          _y += w_y[m] * this._lookUpTableQuadratic[i][m];
          _z += w_z[m] * this._lookUpTableQuadratic[i][m];
        }
        this.vertex(_x, _y, _z);
      }

      // so that we leave currentColor with the last value the user set it to
      this.curFillColor = fillColors[2];
      this.curStrokeColor = strokeColors[2];
      this.immediateMode._quadraticVertex[0] = args[3];
      this.immediateMode._quadraticVertex[1] = args[4];
      this.immediateMode._quadraticVertex[2] = args[5];
    }
  }
};

p5.RendererGL.prototype.curveVertex = function(...args) {
  let w_x = [];
  let w_y = [];
  let w_z = [];
  let t, _x, _y, _z, i;
  t = 0;
  const argLength = args.length;

  if (
    this._lookUpTableBezier.length === 0 ||
    this._lutBezierDetail !== this._pInst._curveDetail
  ) {
    this._lookUpTableBezier = [];
    this._lutBezierDetail = this._pInst._curveDetail;
    const step = 1 / this._lutBezierDetail;
    let start = 0;
    let end = 1;
    let j = 0;
    while (start < 1) {
      t = parseFloat(start.toFixed(6));
      this._lookUpTableBezier[j] = this._bezierCoefficients(t);
      if (end.toFixed(6) === step.toFixed(6)) {
        t = parseFloat(end.toFixed(6)) + parseFloat(start.toFixed(6));
        ++j;
        this._lookUpTableBezier[j] = this._bezierCoefficients(t);
        break;
      }
      start += step;
      end -= step;
      ++j;
    }
  }

  const LUTLength = this._lookUpTableBezier.length;

  if (argLength === 2) {
    this.immediateMode._curveVertex.push(args[0]);
    this.immediateMode._curveVertex.push(args[1]);
    if (this.immediateMode._curveVertex.length === 8) {
      this.isCurve = true;
      w_x = this._bezierToCatmull([
        this.immediateMode._curveVertex[0],
        this.immediateMode._curveVertex[2],
        this.immediateMode._curveVertex[4],
        this.immediateMode._curveVertex[6]
      ]);
      w_y = this._bezierToCatmull([
        this.immediateMode._curveVertex[1],
        this.immediateMode._curveVertex[3],
        this.immediateMode._curveVertex[5],
        this.immediateMode._curveVertex[7]
      ]);
      for (i = 0; i < LUTLength; i++) {
        _x =
          w_x[0] * this._lookUpTableBezier[i][0] +
          w_x[1] * this._lookUpTableBezier[i][1] +
          w_x[2] * this._lookUpTableBezier[i][2] +
          w_x[3] * this._lookUpTableBezier[i][3];
        _y =
          w_y[0] * this._lookUpTableBezier[i][0] +
          w_y[1] * this._lookUpTableBezier[i][1] +
          w_y[2] * this._lookUpTableBezier[i][2] +
          w_y[3] * this._lookUpTableBezier[i][3];
        this.vertex(_x, _y);
      }
      for (i = 0; i < argLength; i++) {
        this.immediateMode._curveVertex.shift();
      }
    }
  } else if (argLength === 3) {
    this.immediateMode._curveVertex.push(args[0]);
    this.immediateMode._curveVertex.push(args[1]);
    this.immediateMode._curveVertex.push(args[2]);
    if (this.immediateMode._curveVertex.length === 12) {
      this.isCurve = true;
      w_x = this._bezierToCatmull([
        this.immediateMode._curveVertex[0],
        this.immediateMode._curveVertex[3],
        this.immediateMode._curveVertex[6],
        this.immediateMode._curveVertex[9]
      ]);
      w_y = this._bezierToCatmull([
        this.immediateMode._curveVertex[1],
        this.immediateMode._curveVertex[4],
        this.immediateMode._curveVertex[7],
        this.immediateMode._curveVertex[10]
      ]);
      w_z = this._bezierToCatmull([
        this.immediateMode._curveVertex[2],
        this.immediateMode._curveVertex[5],
        this.immediateMode._curveVertex[8],
        this.immediateMode._curveVertex[11]
      ]);
      for (i = 0; i < LUTLength; i++) {
        _x =
          w_x[0] * this._lookUpTableBezier[i][0] +
          w_x[1] * this._lookUpTableBezier[i][1] +
          w_x[2] * this._lookUpTableBezier[i][2] +
          w_x[3] * this._lookUpTableBezier[i][3];
        _y =
          w_y[0] * this._lookUpTableBezier[i][0] +
          w_y[1] * this._lookUpTableBezier[i][1] +
          w_y[2] * this._lookUpTableBezier[i][2] +
          w_y[3] * this._lookUpTableBezier[i][3];
        _z =
          w_z[0] * this._lookUpTableBezier[i][0] +
          w_z[1] * this._lookUpTableBezier[i][1] +
          w_z[2] * this._lookUpTableBezier[i][2] +
          w_z[3] * this._lookUpTableBezier[i][3];
        this.vertex(_x, _y, _z);
      }
      for (i = 0; i < argLength; i++) {
        this.immediateMode._curveVertex.shift();
      }
    }
  }
};

p5.RendererGL.prototype.image = function(
  img,
  sx,
  sy,
  sWidth,
  sHeight,
  dx,
  dy,
  dWidth,
  dHeight
) {
  if (this._isErasing) {
    this.blendMode(this._cachedBlendMode);
  }

  this._pInst.push();

  this._pInst.noLights();
  this._pInst.noStroke();

  this._pInst.texture(img);
  this._pInst.textureMode(constants.NORMAL);

  let u0 = 0;
  if (sx <= img.width) {
    u0 = sx / img.width;
  }

  let u1 = 1;
  if (sx + sWidth <= img.width) {
    u1 = (sx + sWidth) / img.width;
  }

  let v0 = 0;
  if (sy <= img.height) {
    v0 = sy / img.height;
  }

  let v1 = 1;
  if (sy + sHeight <= img.height) {
    v1 = (sy + sHeight) / img.height;
  }

  this.beginShape();
  this.vertex(dx, dy, 0, u0, v0);
  this.vertex(dx + dWidth, dy, 0, u1, v0);
  this.vertex(dx + dWidth, dy + dHeight, 0, u1, v1);
  this.vertex(dx, dy + dHeight, 0, u0, v1);
  this.endShape(constants.CLOSE);

  this._pInst.pop();

  if (this._isErasing) {
    this.blendMode(constants.REMOVE);
  }
};

export default p5;
