import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/app";
import { AppModel } from "./models/appModel";

const ConnectedApp = AppModel.view(
  {
    loading: state => state.loading,
    error: state => state.predictionError,
    prediction: state => state.prediction
  },
  { predict: AppModel.actions.predict }
)(App);

render(<ConnectedApp />, document.getElementById("app"));
