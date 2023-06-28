import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../models/Project";
import styles from "./ProjectPage.module.scss";
import { ProjectPageProps } from "./ProjectPage.types";
import { projectAPI } from "../../controllers/ProjectAPI";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

const ProjectPage = ({ }: ProjectPageProps) => {
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        setLoading(true);
        projectAPI
            .find(id)
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    }, [id]);


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

