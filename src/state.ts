import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";

import { ProjectState } from "./Projects/state/projectTypes";
import { initialProjectState } from "./Projects/state/projectReducer";
import { projectReducer } from "./Projects/state/projectReducer";

const reducer = combineReducers({
  projectState: projectReducer,
});

export default function configureStore(preloadedState: any) {
    console.log("preloadedState => ", preloadedState);
  const middlewares = [ReduxThunk];
  console.log("middlewares => ", middlewares);
  const middlewareEnhancer = applyMiddleware(...middlewares);
  console.log("middlewareEnhancer => ", middlewareEnhancer);

  //Thunk is middleware
  //DevTools is an enhancer (actually changes Redux)
  //returns enhancer <= applyMiddleware wraps middleware and returns an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer);

  //to use thunk & devTools
  const enhancer = composeWithDevTools(middlewareEnhancer);
  console.log("enhancer => ", enhancer);

  const store = createStore(reducer, preloadedState, enhancer);
  console.log("store => ", store);
  return store;
}

export interface AppState {
  projectState: ProjectState;
}

export const initialAppState: AppState = {
  projectState: initialProjectState,
};

export const store = configureStore(initialAppState);

console.log("final store => ", store);
