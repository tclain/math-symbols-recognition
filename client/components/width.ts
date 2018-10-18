import { debounce } from "lodash";
import * as React from "react";

export interface WidthProps {
  children: (options: {ref: React.RefObject<any>, width: number}) => 
}

/**
 * A reusable component to get the width of an element exposing a render prop
 */

export class Width extends React.Component {
  private elementToMeasure: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
    this.elementToMeasure = React.createRef();
    // bind methods to this
    this.measureElement = debounce(this.measureElement).bind(this);
  }

  componentDidMount() {
    // on window resize, recalculate the width of the element
    window.addEventListener("resize", this.measureElement);
    // trigger it the first time
    this.measureElement();
  }
  componentWillUnmount() {
    // flush references on unmount
    window.removeEventListener("resize", this.measureElement);
  }

  private measureElement() {
    this.setState({
      width: this.elementToMeasure.current.offsetWidth,
      height: this.elementToMeasure.current.offsetWidth
    });
  }
  public render() {
    /** Use a render prop to have complete control of the rendering */
    return this.props.children({
      ref: this.elementToMeasure,
      width: this.state.width
    });
  }
}
