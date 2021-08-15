import { Task, Project } from "./base_objects";

const PageDOM = (function() {
    let projectList = [];

    const addProject = function(newProject) {
        projectList.push(newProject);
    }

    const deleteProject = function(projToDelete) {
        projectList = projectList.filter(item => item.getName() != projToDelete);
    }

    // const createNewProjectForm = function() {
    //     let projectFormElement = document.createElement("form");
    //     let projectFormInputName = document.createElement("input");
    //     let projectFormInputDescription = document.createElement("textarea");
    //     let projectFormInputPriority = document.createElement("input");
    // }

    const logit = () => console.log("PageDOM here");

    return {
        logit,
    }
})()

export  { PageDOM };