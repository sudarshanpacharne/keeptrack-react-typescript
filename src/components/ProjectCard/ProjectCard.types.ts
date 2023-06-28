import { Project } from "../../models/Project";

 export interface ProjectCardProps {
    project: Project,
    onEdit:(project: Project) => void;
 } 
