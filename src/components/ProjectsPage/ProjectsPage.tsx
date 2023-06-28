import { useEffect, useState } from "react";
import styles from "./ProjectsPage.module.scss";
import ProjectList from "../ProjectList/ProjectList";
import { ProjectsPageProps } from "./ProjectsPage.types"
import { projectAPI } from "../../controllers/ProjectAPI";
import { Project } from "../../models/Project";

const ProjectsPage = ({ }: ProjectsPageProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError('');
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }
            }
            catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            }
            finally {
                setLoading(false)
            }
        }

        loadProjects();
    }, [currentPage])

    const handleSave = (project: Project) => {
        console.log('Saving Project =>', project);
        projectAPI.put(project).then((project: Project) => {
            let updatedProjects = projects.map(p => {
                return p.id === project.id ? project : p
            })
            setProjects(updatedProjects);
        }).catch((e: Error) => {
            if (e instanceof Error) console.log('error in update project =>', e.message)
        }).finally(() => {
            setLoading(false)
        });
    }

    const handleLoadMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e);
        setCurrentPage((currentPage) => currentPage + 1);
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
            <ProjectList projects={projects} onSave={handleSave}></ProjectList>
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
