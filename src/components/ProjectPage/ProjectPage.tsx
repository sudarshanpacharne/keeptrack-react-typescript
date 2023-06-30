import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectPageProps } from "./ProjectPage.types";
import { useDispatch, useSelector } from "react-redux";
import { ProjectState } from "../../Projects/state/projectTypes";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../state";
import { getProjectById } from "../../Projects/state/projectActions";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

const ProjectPage = ({ }: ProjectPageProps) => {
    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    const loading = useSelector((appState: AppState) => appState.projectState.loading)
    const project = useSelector((appState: AppState) => appState.projectState.selectedProject);

    const error = useSelector((appState: AppState) => appState.projectState.error);
    // const [loading, setLoading] = useState(false);
    // const [project, setProject] = useState<Project | null>(null);
    // const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        dispatch(getProjectById(id))
    },[dispatch])

    // useEffect(() => {
    //     setLoading(true);
    //     projectAPI
    //         .find(id)
    //         .then((data) => {
    //             setProject(data);
    //             setLoading(false);
    //         })
    //         .catch((e) => {
    //             setError(e);
    //             setLoading(false);
    //         });
    // }, [id]);


    return (
        <>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}

            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span> {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            { project && <ProjectDetails project={project} />}
        </>
    )
}

export default ProjectPage

