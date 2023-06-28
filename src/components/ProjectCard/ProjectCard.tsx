import { Link } from "react-router-dom";
import { Project } from "../../models/Project";
import styles from "./ProjectCard.module.scss";
import { ProjectCardProps } from "./ProjectCard.types";

function formatDescription(description: string): string {
    return description.substring(0, 60) + '...';
}

const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {

    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited);
    }
     
    return (
        <>
            <div className="card">
                <img src={project.imageUrl} alt={project.name} />
                <section className="section dark">
                    <Link to={`/projects/${project.id}` }>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                    </Link>
                    <p>{formatDescription(project.description)}</p>
                                     
                    <p>Budget : {project.budget.toLocaleString()}</p>
                    <button className="bordered" onClick={() => handleEditClick(project)}>
                        <span className="icon-edit"></span>
                        Edit
                    </button>
                </section>
            </div>
        </>
    )
}

export default ProjectCard 
