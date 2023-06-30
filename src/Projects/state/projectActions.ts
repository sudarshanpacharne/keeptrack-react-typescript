import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  LOAD_PROJECTS_REQ,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  ProjectState,
  SAVE_PROJECT_REQ,
  GET_BY_ID_PROJECT_REQ,
  GET_BY_ID_PROJECT_SUCCESS,
  GET_BY_ID_PROJECT_FAILURE,
} from './projectTypes';

import { projectAPI } from '../../controllers/ProjectAPI';
import { Project } from '../../models/Project';

//action creators
export function loadProjects(
  page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: LOAD_PROJECTS_REQ });
    return projectAPI
      .get(page)
      .then((data) => {
        dispatch({
          type: LOAD_PROJECTS_SUCCESS,
          payload: { projects: data, page },
        });
      })
      .catch((error) => {
        dispatch({ type: LOAD_PROJECTS_FAILURE, payload: error });
      });
  };
}

//action get by id project
export function getProjectById(
    id: number
  ): ThunkAction<void, ProjectState, null, Action<string>> {
    return (dispatch: any) => {
      dispatch({ type: GET_BY_ID_PROJECT_REQ });
      return projectAPI
        .find(id)
        .then((data) => {
          dispatch({
            type: GET_BY_ID_PROJECT_SUCCESS,
            payload: data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_BY_ID_PROJECT_FAILURE, payload: error });
        });
    };
  }

export function saveProject(
  project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: SAVE_PROJECT_REQ });
    return projectAPI
      .put(project)
      .then((data) => {
        dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: SAVE_PROJECT_FAILURE, payload: error });
      });
  };
}