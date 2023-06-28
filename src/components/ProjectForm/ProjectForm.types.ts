import { Project } from "../../models/Project";

 export interface ProjectFormProps {
    project: Project;
    onSave: (project: Project) => void;
    onCancle: () => void;
 } 
