import cornerSquareTypes from "../../../constants/cornerSquareTypes";
import { CornerSquareType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from "../../../types";

export default class QRCornerSquare {
  _context: CanvasRenderingContext2D;
  _type: CornerSquareType;

  constructor({ context, type }: { context: CanvasRenderingContext2D; type: CornerSquareType }) {
    this._context = context;
    this._type = type;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const context = this._context;
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerSquareTypes.square:
        drawFunction = this._drawSquare;
        break;
      case cornerSquareTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      //dots
      case cornerSquareTypes.dots:
        drawFunction = this._drawDots;
        break;
      //classy
      case cornerSquareTypes.classy:
        drawFunction = this._drawClassy;
        break;
      // case cornerSquareTypes.classyRounded:
      //   drawFunction = this._drawClassyRounded;
      //   break;
      case cornerSquareTypes.dot:
      default:
        drawFunction = this._drawDot;
    }

    drawFunction.call(this, { x, y, size, context, rotation });
  }

  _rotateFigure({ x, y, size, context, rotation = 0, draw }: RotateFigureArgsCanvas): void {
    const cx = x + size / 2;
    const cy = y + size / 2;

    context.translate(cx, cy);
    rotation && context.rotate(rotation);
    draw();
    context.closePath();
    rotation && context.rotate(-rotation);
    context.translate(-cx, -cy);
  }

  _basicDot(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, 0, Math.PI * 2);
        context.arc(0, 0, size / 2 - dotSize, 0, Math.PI * 2);
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.rect(-size / 2, -size / 2, size, size);
        context.rect(-size / 2 + dotSize, -size / 2 + dotSize, size - 2 * dotSize, size - 2 * dotSize);
      }
    });
  }
  _drawRoundedCorner(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    args: BasicFigureDrawArgsCanvas
  ) {
    const { context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle);
        context.lineTo(x, y);
        context.closePath();
        context.fill();
      }
    });
  }
  _basicCornerRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, -Math.PI / 2, 0);
        context.lineTo(size / 2, size / 2);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(-size / 2, -size / 2);
        context.lineTo(0, -size / 2);

        context.arc(-size, -size, 2.5 * size, Math.PI, -Math.PI / 2);
        context.lineTo(size, -3.5 * size);
        context.arc(size, -size, 2.5 * size, -Math.PI / 2, 0);
        context.lineTo(3.5 * size, -size);
        context.arc(size, size, 2.5 * size, 0, Math.PI / 2);
        context.lineTo(-size, 3.5 * size);
        context.arc(-size, size, 2.5 * size, Math.PI / 2, Math.PI);
        context.lineTo(-3.5 * size, -size);

        context.arc(-size, -size, 1.5 * size, Math.PI, -Math.PI / 2);
        context.lineTo(size, -2.5 * size);
        context.arc(size, -size, 1.5 * size, -Math.PI / 2, 0);
        context.lineTo(2.5 * size, -size);
        context.arc(size, size, 1.5 * size, 0, Math.PI / 2);
        context.lineTo(-size, 2.5 * size);
        context.arc(-size, size, 1.5 * size, Math.PI / 2, Math.PI);
        context.lineTo(-2.5 * size, -size);
      }
    });
  }
  _basicCornersRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    this._rotateFigure({
      ...args,
      draw: () => {
        //right top
        context.arc(-dotSize, -dotSize, 2.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -3.5 * dotSize);

        context.lineTo(size / 2, -size / 2);
        // left bottom
        context.arc(dotSize, dotSize, 2.5 * dotSize, 0, Math.PI / 2);
        context.lineTo(-dotSize, 3.5 * dotSize);

        //left top
        context.lineTo(-size / 2, size / 2);
        context.lineTo(-3.5 * dotSize, -dotSize);

        //right top
        context.arc(-dotSize, -dotSize, 1.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -2.5 * dotSize);

        // right bottom
        context.lineTo(size / 2.8, -size / 2.8);
        context.lineTo(2.5 * dotSize, -dotSize);

        //left bottom
        context.arc(dotSize, dotSize, 1.5 * dotSize, 0, Math.PI / 2);
        context.lineTo(-dotSize, 2.5 * dotSize);

        //left top
        context.lineTo(-size / 2.8, size / 2.8);
        context.lineTo(-2.5 * dotSize, -dotSize);
      }
    });
  }
  _basicDots(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const secondPoint = size * 1.05;
    const thirdPoint = size * 2.05;
    const fourthPoint = size * 3.05;
    const fifthPoint = size * 4.05;

    this._rotateFigure({
      ...args,
      draw: () => {
        //first row
        context.arc(0, 0, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(secondPoint, 0, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(thirdPoint, 0, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(fourthPoint, 0, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(fifthPoint, 0, size / 2, 0, Math.PI * 2);
        context.closePath();
        //second row
        context.arc(0, secondPoint, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(fifthPoint, secondPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        //third row
        context.arc(0, thirdPoint, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(fifthPoint, thirdPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        //fourth row
        context.arc(0, fourthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();

        context.arc(fifthPoint, fourthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        //fifth section
        context.arc(0, fifthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(secondPoint, fifthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(thirdPoint, fifthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(fourthPoint, fifthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(fifthPoint, fifthPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
      }
    });
  }
  _drawClassy({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerRounded({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }
  _basicExtraRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(-dotSize, -dotSize, 2.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -3.5 * dotSize);

        context.arc(dotSize, -dotSize, 2.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(3.5 * dotSize, -dotSize);

        context.arc(dotSize, dotSize, 2.5 * dotSize, 0, Math.PI / 2);
        context.lineTo(-dotSize, 3.5 * dotSize);

        context.arc(-dotSize, dotSize, 2.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-3.5 * dotSize, -dotSize);

        context.arc(-dotSize, -dotSize, 1.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -2.5 * dotSize);

        context.arc(dotSize, -dotSize, 1.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(2.5 * dotSize, -dotSize);

        context.arc(dotSize, dotSize, 1.5 * dotSize, 0, Math.PI / 2);
        context.lineTo(-dotSize, 2.5 * dotSize);

        context.arc(-dotSize, dotSize, 1.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-2.5 * dotSize, -dotSize);
      }
    });
  }

  _drawDot({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicDot({ x, y, size, context, rotation });
  }

  _drawSquare({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicSquare({ x, y, size, context, rotation });
  }

  _drawExtraRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicExtraRounded({ x, y, size, context, rotation });
  }
  _drawDots({ x, y, size, context }: DrawArgsCanvas): void {
    const realSize = size / 4.95;
    this._basicDots({ x, y, size: realSize, context, rotation: 0 });
  }
}
