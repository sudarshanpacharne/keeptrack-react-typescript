import { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectForm from "../ProjectForm/ProjectForm";
import styles from "./ProjectList.module.scss";
import { ProjectListProps } from "./ProjectList.types";
import { Project } from "../../models/Project";

const ProjectList = ({ projects, onSave }: ProjectListProps) => {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    }

    const handleSave = (project: Project) => {
        console.log("got project in save =>", project)
        // onSave(project);
    }

    const handleCancle = () => {
        setProjectBeingEdited({});
    }

    return (
        <>
            <div className={`${styles.ProjectListContainer} row responsive-margin responsive-padding`}>
                {
                    projects.map((project, index) => {
                        return (
                            // removed onSave={handleSave} from project list due react-redux
                            <div className="cols-sm" key={index}>
                                {
                                    (projectBeingEdited == project ? 
                                    <ProjectForm project={project} onCancle={handleCancle} /> 
                                    : <ProjectCard project={project} onEdit={handleEdit} />)
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProjectList 
