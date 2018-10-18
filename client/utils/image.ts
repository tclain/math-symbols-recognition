import { render } from "react-dom";

const SIZE = 45;

/**
 *
 * @param canvas the canvas reference
 */
export function getImageData(canvas: HTMLCanvasElement): any {
  const downscaledCanvas = document.createElement("canvas");
  downscaledCanvas.getContext("2d").drawImage(canvas, 0, 0);

  const scale = SIZE / canvas.width;
  const renderingContext = downscaledCanvas.getContext("2d");
  renderingContext.scale(scale, scale);
  console.log(scale);
  const data = renderingContext.getImageData(
    0,
    0,
    downscaledCanvas.width,
    downscaledCanvas.height
  );
  return data;
}
