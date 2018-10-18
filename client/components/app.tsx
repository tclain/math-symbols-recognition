import * as React from "react";
import { debounce } from "lodash";
import { Header } from "./header";
import { DrawingSurface } from "./drawingSurface";
import { MathCharacter } from "./mathCharacter";

export interface AppProps {
  /** Is the engine processing the image */
  loading?: boolean;
  /** Is there an error in the prediction */
  error?: boolean;
  /** the prediction to display */
  prediction: string;
  /** callback to trigger the prediction */
  predict: () => void;
}

export const App: React.SFC<AppProps> = ({
  loading,
  error,
  prediction,
  predict
}) => (
  <div>
    <Header>Draw a character in the box</Header>
    <DrawingSurface onDraw={debounce(predict, 300)} />
    {error && <Header>Oups, something is wrong</Header>}
    {loading && !error ? (
      <Header>Humm...</Header>
    ) : (
      <Header>
        I think this is a <MathCharacter>{prediction}</MathCharacter>
      </Header>
    )}
  </div>
);
