import { BaseSyntheticEvent, ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "./ProjectForm.module.scss";
import { ProjectFormProps } from "./ProjectForm.types";
import { Project } from "../../models/Project";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ProjectState } from "../../Projects/state/projectTypes";
import { loadProjects, saveProject } from "../../Projects/state/projectActions";

const ProjectForm = ({ project: initialProject, onCancle, onSave }: ProjectFormProps) => {

    const [project, setProject] = useState(initialProject);

    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    });

    function validate(project: Project) {
        let errors: any = { name: '', description: '', budget: '' };

        if (project.name.length === 0) errors.name = 'Name is required!';
        if (project.name.length > 0 && project.name.length < 3) errors.name = 'Name needs to be greater than 3 chars!';
        if (project.description.length === 0) errors.description = 'Description is required!';
        if (project.budget == 0) errors.budget = 'Budget is required!';

        console.log('errors => ', errors);

        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        )
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        // onSave(project);
        dispatch(saveProject(project));
        dispatch(loadProjects(1));
    }

    const handleChange = (event: BaseSyntheticEvent) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updatedValue string to a +number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited +like project.id
        // the spread operator (...) is used to
        // spread the previous project properties and the new change
        setProject((p: Project) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });

        setErrors(() => validate(updatedProject));

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="input-group vertical">
                <label htmlFor="name">Project Name</label>
                <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
                {
                    errors.name.length > 0 && (
                        <div className="card error">
                            <p>{errors.name}</p>
                        </div>
                    )
                }
                <label htmlFor="description">Project Description</label>
                <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}></textarea>
                {
                    errors.description.length > 0 && (
                        <div className="card error">
                            <p>{errors.description}</p>
                        </div>
                    )
                }

                <label htmlFor="budget">Project Budget</label>
                <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
                {
                    errors.budget.length > 0 && (
                        <div className="card error">
                            <p>{errors.budget}</p>
                        </div>
                    )
                }

                <label htmlFor="isActive">Active?</label>
                <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />


                <div className="input-group">
                    <button type="submit" className="primary bordered medium">Save</button>
                    <span></span>
                    <button type="button" className="bordered medium" onClick={onCancle}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default ProjectForm 
