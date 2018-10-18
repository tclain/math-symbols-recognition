import { last, head } from "lodash";
import * as React from "react";
import { css } from "emotion";
import simplify from "simplify-js";

export const SquareCanvasStyled = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 3px solid #cecece;
  transition: 0.2s all ease-in-out;
  &:hover {
    border: 3px solid black;
  }
`;

export interface IPoint {
  x: number;
  y: number;
}

/**
 * A simple canvas based drawing surface.
 * The only contraint is the surface to be a square.
 * This demonstrate how we can simply integrate web api inside React rendering process
 */

export class DrawingSurface extends React.Component<any> {
  private canvasRef: React.Ref<any> | any;
  private canvasContext: CanvasRenderingContext2D;
  /**
   * the overall list of path to be drawn
   */
  private paths: Array<IPoint>[];

  private isDrawing: boolean;
  constructor(props) {
    super(props);
    // defining ref to access the inner canvas
    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.canvasContext = null;

    // we don't start by drawing
    this.isDrawing = false;
    // initialize with a void path
    this.paths = [[]];

    // bind methods
    this.addCurrentRelativePointerPositionToPath = this.addCurrentRelativePointerPositionToPath.bind(
      this
    );
    this.onMousePointerDown = this.onMousePointerDown.bind(this);
    this.onMousePointerMoving = this.onMousePointerMoving.bind(this);
    this.onMousePointerUp = this.onMousePointerUp.bind(this);
    this.getDrawingContext = this.getDrawingContext.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate() {
    // we are taking care of the rendering, thank you
    return false;
  }
  /** retrieve the 2d drawingContext */
  private getDrawingContext() {
    //once the canvas is mounted, get its context
    // retrieve the 2d context
    if (!this.canvasContext)
      // @ts-ignore
      this.canvasContext = this.canvasRef.current.getContext("2d");
    return this.canvasContext;
  }

  /** get the current relative position of the mouse and save it in the last path */
  private addCurrentRelativePointerPositionToPath(event) {
    // get relative x and y of the pointer
    const clickedX = event.pageX - this.canvasRef.current.offsetLeft;
    const clickedY = event.pageY - this.canvasRef.current.offsetTop;
    // let save the last mouse position in the last path
    last(this.paths).push({ x: clickedX, y: clickedY });
  }
  // CALLBACKS
  /** callback when the mouse or pointer is clicked  */
  private onMousePointerDown(event) {
    event.persist();
    this.isDrawing = true;
    this.addCurrentRelativePointerPositionToPath(event);
    this.draw();
  }

  /** callback when the pointer is moving */
  private onMousePointerMoving(event) {
    event.persist();
    if (this.isDrawing) {
      this.addCurrentRelativePointerPositionToPath(event);
      this.draw();
    }
  }

  /** Callback when the click is released */
  private onMousePointerUp(event) {
    event.persist();
    // we create a new path
    this.isDrawing = false;
    this.paths.push([]);
    this.draw();
  }

  /** very simple method, that clears the canvas each time */
  private draw() {
    const context = this.getDrawingContext();
    // clear the canvas

    const simplifiedPaths: IPoint[][] = this.paths.map(path =>
      simplify(path, 2)
    );
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    // setup the colors

    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = 10;

    simplifiedPaths.forEach(path => {
      // the first point will be our starting point for this path
      if (path.length < 2) return;

      const startPoint = head(path);
      // the last point for the path will our ending path
      //const endPoint = last(path);
      // start to actually draw
      context.moveTo(startPoint.x, startPoint.y);
      context.beginPath();

      path.forEach((point, index) => {
        // get the start point of the path
        const strokeStartPoint = index === 0 ? startPoint : path[index - 1];
        context.moveTo(strokeStartPoint.x, strokeStartPoint.y);
        context.lineTo(point.x, point.y);
      });
      context.closePath();
      context.stroke();
    });
  }

  public render() {
    return (
      <canvas
        className={SquareCanvasStyled}
        width={500}
        height={500}
        ref={this.canvasRef}
        onMouseDown={this.onMousePointerDown}
        onMouseMove={this.onMousePointerMoving}
        onMouseUp={this.onMousePointerUp}

        //onPointerDown={this.onMousePointerDown}
      />
    );
  }
}
