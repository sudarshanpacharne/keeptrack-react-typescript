import { useEffect, useState } from "react";
import styles from "./ProjectsPage.module.scss";
import ProjectList from "../ProjectList/ProjectList";
import { ProjectsPageProps } from "./ProjectsPage.types"
import { projectAPI } from "../../controllers/ProjectAPI";
import { Project } from "../../models/Project";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ProjectState } from "../../Projects/state/projectTypes";
import { AppState } from "../../state";
import { loadProjects } from "../../Projects/state/projectActions";

const ProjectsPage = ({ }: ProjectsPageProps) => {
    // removed due to react-redux
    // const [projects, setProjects] = useState<Project[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | undefined>(undefined);
    // const [currentPage, setCurrentPage] = useState(1);

    const loading = useSelector(
        (appState: AppState) => appState.projectState.loading
    );

    const projects = useSelector(
        (appState: AppState) => appState.projectState.projects
    );

    const error = useSelector(
        (appState: AppState) => appState.projectState.error
    );

    const currentPage = useSelector(
        (appState: AppState) => appState.projectState.page
    );

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    useEffect(() => {
        dispatch(loadProjects(1));
    }, [dispatch]);

    // removed due to react redux
    // useEffect(() => {
    //     async function loadProjects() {
    //         setLoading(true);
    //         try {
    //             const data = await projectAPI.get(currentPage);
    //             setError('');
    //             if (currentPage === 1) {
    //                 setProjects(data);
    //             } else {
    //                 setProjects((projects) => [...projects, ...data]);
    //             }
    //         }
    //         catch (e) {
    //             if (e instanceof Error) {
    //                 setError(e.message);
    //             }
    //         }
    //         finally {
    //             setLoading(false)
    //         }
    //     }

    //     loadProjects();
    // }, [currentPage])

    // const handleSave = (project: Project) => {
    //     console.log('Saving Project =>', project);
    //     projectAPI.put(project).then((project: Project) => {
    //         let updatedProjects = projects.map(p => {
    //             return p.id === project.id ? project : p
    //         })
    //         setProjects(updatedProjects);
    //     }).catch((e: Error) => {
    //         if (e instanceof Error) console.log('error in update project =>', e.message)
    //     }).finally(() => {
    //         setLoading(false)
    //     });
    // }

    const handleLoadMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log(e);
        // setCurrentPage((currentPage) => currentPage + 1);
        dispatch(loadProjects(currentPage + 1));
    }

    return (
        <>
            <h2>Projects</h2>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            {/* removed onSave={handleSave} props from projectList */}
            <ProjectList projects={projects}></ProjectList>
            {
                loading && (
                    <div className="center-page">
                        <span className="spinner primary"></span>
                        <p>Loading....</p>
                    </div>
                )
            }
            {
                !loading && !error && (
                    <div className={styles.LoadMoreBtn}>
                        <button style={{ width: "300px" }} className="primary" onClick={handleLoadMoreClick}>Load More</button>
                    </div>
                )
            }

        </>
    )
}

export default ProjectsPage 
