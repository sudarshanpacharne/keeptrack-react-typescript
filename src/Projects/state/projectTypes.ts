import { Project } from "../../models/Project";

export const LOAD_PROJECTS_REQ = "LOAD_PROJECT_REQ";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECT_SUCCESS";
export const LOAD_PROJECTS_FAILURE = "LOAD_PROJECT_FAILURE";
export const GET_BY_ID_PROJECT_REQ = "GET_BY_ID_PROJECT_REQ";
export const GET_BY_ID_PROJECT_SUCCESS = "GET_BY_ID_PROJECT_SUCCESS";
export const GET_BY_ID_PROJECT_FAILURE = "GET_BY_ID_PROJECT_FAILURE";
export const SAVE_PROJECT_REQ = "SAVE_PROJECT_REQ";
export const SAVE_PROJECT_SUCCESS = "SAVE_PROJECT_SUCCESS";
export const SAVE_PROJECT_FAILURE = "SAVE_PROJECT_FAILURE";
export const DELETE_PROJECT_REQ = "DELETE_PROJECT_REQ";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";

interface LoadProjectsReq {
    type: typeof LOAD_PROJECTS_REQ
}

interface LoadProjectsSuccess {
    type: typeof LOAD_PROJECTS_SUCCESS,
    payload: { projects: Project[], page: number }
}

interface LoadProjectsFailure {
    type: typeof LOAD_PROJECTS_FAILURE,
    payload: { message: string }
}

interface GetByIdProjectReq {
    type: typeof GET_BY_ID_PROJECT_REQ
}

interface GetByIdProjectSuccess {
    type: typeof GET_BY_ID_PROJECT_SUCCESS,
    payload: Project
}

interface GetByIdProjectFailure {
    type: typeof GET_BY_ID_PROJECT_FAILURE,
    payload: { message: string }
}

interface SaveProjectReq {
    type: typeof SAVE_PROJECT_REQ
}

interface SaveProjectSuccess {
    type: typeof SAVE_PROJECT_SUCCESS,
    payload: Project
}

interface SaveProjectFailure {
    type: typeof SAVE_PROJECT_FAILURE,
    payload: { message: string }
}
interface DeleteProjectReq {
    type: typeof DELETE_PROJECT_REQ
}

interface DeleteProjectSuccess {
    type: typeof DELETE_PROJECT_SUCCESS,
    payload: Project
}

interface DeleteProjectFailure {
    type: typeof DELETE_PROJECT_FAILURE,
    payload: { message: string }
}


export type ProjectActionTypes =
| LoadProjectsReq
| LoadProjectsSuccess
| LoadProjectsFailure
| GetByIdProjectReq
| GetByIdProjectSuccess
| GetByIdProjectFailure
| SaveProjectReq
| SaveProjectSuccess
| SaveProjectFailure
| DeleteProjectReq
| DeleteProjectSuccess
| DeleteProjectFailure;


export interface ProjectState {
    loading: boolean;
    projects: Project[];
    selectedProject: Project;
    page: number;
    error: string | undefined;
}