import { model } from "../utils/model";
import { predictFromData } from "../utils/data";

export const AppModel = model({
  name: "app",
  state: {
    loading: false,
    prediction: null,
    predictionError: false,
    canvasData: null
  },
  reducers: {
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload
      };
    },
    setCanvasData(state, { payload }) {
      return {
        ...state,
        canvasData: payload
      };
    },
    setPrediction(state, { payload }) {
      return {
        ...state,
        prediction: payload
      };
    },
    setPredictionError(state, { payload }) {
      return {
        ...state,
        predictionError: payload || true
      };
    },
    predict(state) {
      return state;
    }
  },
  effects: {
    async predict(store, action) {
      AppModel.actions.setLoading(true);
      const imageData = store.select(state => state.canvasData);
      try {
        const prediction = await predictFromData(imageData);
        AppModel.actions.setPrediction(prediction);
      } catch (e) {
        AppModel.actions.setPredictionError(e);
      } finally {
        AppModel.actions.setLoading;
      }
    }
  }
});
