import styles from "./ProjectDetails.module.scss";
import { ProjectDetailsProps } from "./ProjectDetails.types";

const ProjectDetails = ({ project }: ProjectDetailsProps) => {

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US");
    }
    
    return (
        <>
            <h2>Project Details</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card large">
                        <img
                            className="rounded"
                            src={project.imageUrl}
                            alt={project.name}
                        />
                        <section className="section dark">
                            <h3 className="strong">
                                <strong>{project.name}</strong>
                            </h3>
                            <p>{project.description}</p>
                            <p>Budget : {project.budget}</p>

                            <p>Signed: {formatDate(project.contractSignedOn)}</p>
                            <p>
                                <mark className="active">
                                    {' '}
                                    {project.isActive ? 'active' : 'inactive'}
                                </mark>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetails 
