import cornerDotTypes from "../../../constants/cornerDotTypes";
import { CornerDotType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from "../../../types";

export default class QRCornerDot {
  _context: CanvasRenderingContext2D;
  _type: CornerDotType;

  constructor({ context, type }: { context: CanvasRenderingContext2D; type: CornerDotType }) {
    this._context = context;
    this._type = type;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const context = this._context;
    const type = this._type;
    let drawFunction;

    switch (type) {
      //square
      case cornerDotTypes.square:
        drawFunction = this._drawSquare;
        break;
      //dots
      case cornerDotTypes.dots:
        drawFunction = this._drawDots;
        break;
      //extra-rounded
      case cornerDotTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      //extra-rounded
      case cornerDotTypes.rounded:
        drawFunction = this._drawRounded;
        break;
      //classy
      case cornerDotTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case cornerDotTypes.classyRounded:
        drawFunction = this._drawClassyRounded;
        break;
      // dot
      case cornerDotTypes.dot:
        drawFunction = this._drawDot;
        break;
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

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, 0, Math.PI * 2);
        context.closePath();
      }
    });
  }
  _basicDots(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const secondPoint = size * 1.05;
    const thirdPoint = size * 2.05;

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
        //second row
        context.arc(0, secondPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(secondPoint, secondPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(thirdPoint, secondPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        //third row
        context.arc(0, thirdPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(secondPoint, thirdPoint, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.arc(thirdPoint, thirdPoint, size / 2, 0, Math.PI * 2);
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.rect(-size / 2, -size / 2, size, size);
      }
    });
  }
  _basicRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const squareSize = size;

    // Posición del cuadrado en el lienzo
    const x = -dotSize * 3.5;
    const y = -dotSize * 3.5;

    // Radio de las esquinas redondas
    const borderRadius = size / 4.4;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        // Trazamos el cuadrado con las esquinas redondas
        context.moveTo(x + borderRadius, y);
        context.lineTo(x + squareSize - borderRadius, y);
        context.arc(x + squareSize - borderRadius, y + borderRadius, borderRadius, (Math.PI * 3) / 2, 0);
        context.lineTo(x + squareSize, y + squareSize - borderRadius);
        context.arc(x + squareSize - borderRadius, y + squareSize - borderRadius, borderRadius, 0, Math.PI / 2);
        context.lineTo(x + borderRadius, y + squareSize);
        context.arc(x + borderRadius, y + squareSize - borderRadius, borderRadius, Math.PI / 2, Math.PI);
        context.lineTo(x, y + borderRadius);
        context.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI, (Math.PI * 3) / 2);
      }
    });
  }
  _basicExtraRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const squareSize = size;

    // Posición del cuadrado en el lienzo
    const x = -dotSize * 3.5;
    const y = -dotSize * 3.5;

    // Radio de las esquinas redondas
    const borderRadius = size / 2.5;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        // Trazamos el cuadrado con las esquinas redondas
        context.moveTo(x + borderRadius, y);
        context.lineTo(x + squareSize - borderRadius, y);
        context.arc(x + squareSize - borderRadius, y + borderRadius, borderRadius, (Math.PI * 3) / 2, 0);
        context.lineTo(x + squareSize, y + squareSize - borderRadius);
        context.arc(x + squareSize - borderRadius, y + squareSize - borderRadius, borderRadius, 0, Math.PI / 2);
        context.lineTo(x + borderRadius, y + squareSize);
        context.arc(x + borderRadius, y + squareSize - borderRadius, borderRadius, Math.PI / 2, Math.PI);
        context.lineTo(x, y + borderRadius);
        context.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI, (Math.PI * 3) / 2);
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
      }
    });
  }
  _basicCornersRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, -Math.PI / 2, 0);
        context.lineTo(size / 2, size / 2);
        context.lineTo(0, size / 2);
        context.arc(0, 0, size / 2, Math.PI / 2, Math.PI);
        context.lineTo(-size / 2, -size / 2);
        context.lineTo(0, -size / 2);
      }
    });
  }
  _basicCornerExtraRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(-size / 2, -size / 2);
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
  _drawRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicRounded({ x, y, size, context, rotation });
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
  _drawClassyRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
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
      this._basicCornerExtraRounded({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }
  _drawDots({ x, y, size, context }: DrawArgsCanvas): void {
    const realSize = size / 3;
    this._basicDots({ x, y, size: realSize, context, rotation: 0 });
  }
}
