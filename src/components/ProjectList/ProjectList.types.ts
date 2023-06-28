import { Project } from "../../models/Project";

 export interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
 } 
