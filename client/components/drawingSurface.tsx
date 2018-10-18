import * as React from "react";
import styled from "react-emotion";

export const SquareCanvas = styled("canvas")`
  display: block;
  background-color: red;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  height: 80vw;

  @media (min-width: 600px) {
    width: 60vw;
    height: 60vw;
  }
  @media (min-width: 1000px) {
    width: 40vw;
    height: 40vw;
  }
  @media (min-width: 1300px) {
    width: 35vw;
    height: 35vw;
  }
`;

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
    return <SquareCanvas />;
  }
}
