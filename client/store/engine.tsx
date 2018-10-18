/** A simple store management solution that support side effects.  Beware: there is no kind of optimization or memoization of changed value */

import { mapValues } from "lodash";
import * as React from "react";

/** A reducer is function that take a current state and the current action and returns a state */
interface IReducers<State> {
  [key: string]: (state: State, action?: { payload: any }) => State;
}

/** The main options object  */
interface IOptions<State, Reducers extends IReducers<State>> {
  name?: string;
  state: State;
  reducers?: Reducers;
  effects?: {
    [key: string]: (
      store: {
        select: (...args: any[]) => void;
      },
      action: { type: string; payload: any }
    ) => void;
  };
}

/** how to access the state inside the view (inspired by connect function) */
interface IViewMapping<State> {
  [key: string]: (stateMatcher: ((state: State) => any)) => void;
}

/** */
interface IBuiltModel<State, Reducers extends IReducers<State>> {
  view: <BaseProps = any>(
    mapping: IViewMapping<State>,
    actionsMapping?: {
      [key: string]: (payload) => void;
    }
  ) => (
    Component: React.ComponentType<BaseProps>
  ) => React.ComponentType<BaseProps>;

  actions: { [key in keyof Reducers]: (payload?: any) => void };
}

/** an ultra simplified version of the model from @pyx4/redux while retaining api compatible options */
export function model<State, Reducers extends IReducers<State>>(
  options: IOptions<State, Reducers>
): IBuiltModel<State, Reducers> {
  const effects = options.effects || {};
  let state = options.state;
  const channel = Subject();

  const StoreLike = {
    select(matcher: (state: State) => any): any {
      return matcher(state);
    }
  };
  const builtModel: IBuiltModel<State, Reducers> = {
    /** Create function to modify the state */
    actions: mapValues(options.reducers, (reducer, key) => payload => {
      // tslint:disable-next-line:no-console
      console.log(
        "Action triggered on model",
        options.name,
        "type:",
        key,
        "payload",
        payload
      );
      // tslint:disable-next-line:no-console
      console.log("Previous state", state);
      state = reducer(state, { payload });
      // tslint:disable-next-line:no-console
      console.log("New State", state);
      if (effects[key]) {
        effects[key](StoreLike, { type: `${options.name}/${key}`, payload });
      }
      channel.react(state);
    }),
    /** A HOC injecting state in the inner component */
    view: (stateMapping: IViewMapping<State>, actionsMapping = {}) => {
      // the generated component with the mapping to the state
      return (TheComponent: React.ComponentType) => {
        return class extends React.Component<any, State> {
          constructor(props) {
            super(props);
            // we are using a local state to store a copy of the state
            this.state = state;
          }
          public componentDidMount() {
            channel.subscribe(payload => {
              this.setState(payload);
            });
          }
          /** get the values from the state as specified by the mapping */
          private mapValuesFromState() {
            return mapValues(stateMapping, mapping => mapping(this.state));
          }
          public render() {
            return (
              <TheComponent
                {...this.mapValuesFromState()}
                {...actionsMapping}
              />
            );
          }
        };
      };
    }
  };

  return builtModel;
}
