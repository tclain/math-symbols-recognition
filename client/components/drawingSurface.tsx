import * as React from "react";

/**
 * A simple canvas based drawing surface.
 * The only contraint is the surface to be a square.
 * This demonstrate how we can simply integrate web api inside React rendering process
 */

export class DrawingSurface extends React.Component<any> {
  constructor(props) {
    super(props);
    // defining ref to access the inner canvas
  }

  public render() {
    return <div>Drawing Surface</div>;
  }
}
