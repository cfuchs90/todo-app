import { Project, ProjectContainer } from "./base_objects";
import "../styles/main-style.scss";

const PageDOM = (function() {
    const rootNode = document.querySelector(".project-container");
    const headerNode = document.querySelector("header");

    const createNewProjectForm = function() {
        // TODO
        let projectFormElement = document.createElement("form");
        let projectFormInputName = document.createElement("input");
        let projectFormInputDescription = document.createElement("textarea");
        let projectFormInputPriority = document.createElement("input");
    }

    const log = () => console.log("PageDOM here");

    const createNavBar = function(linkNames) {
        let navBarElement = document.createElement("nav");
        let navBarList = document.createElement("ul");
        let linkItemShowProjects = document.createElement("li");
        let linkItemNewProject = document.createElement("li");
        let linkItemShowProjectsText = document.createElement("a");
        let linkItemNewProjectText = document.createElement("a");


        linkItemShowProjectsText.textContent = "Show Projects";
        linkItemNewProjectText.textContent = "New Project";

        linkItemShowProjects.addEventListener("click", function() {
            renderProjects(ProjectContainer.getProjects());
        });

        linkItemNewProject.addEventListener("click", function() {
            // TODO
        });

        linkItemShowProjects.appendChild(linkItemShowProjectsText);
        linkItemNewProject.appendChild(linkItemNewProjectText);
        
        navBarList.appendChild(linkItemShowProjects);
        navBarList.appendChild(linkItemNewProject);


        navBarElement.appendChild(navBarList);
        navBarElement.classList.add("nav-bar");

        headerNode.appendChild(navBarElement);
    }

    const createProjectElement = function(projectElement) {
        let projectCard = document.createElement("div");
        let projectNameHeader = document.createElement("h1");
        let projectDescriptionBox = document.createElement("p");
        let projectDueDateElement = document.createElement("span");
        let projectPriorityBox = document.createElement("h1");

        projectCard.classList.add("project-card");

        projectNameHeader.textContent = projectElement.getName();
        projectDescriptionBox.textContent = projectElement.getDescription();
        projectDueDateElement.textContent = projectElement.getDueDate();
        projectPriorityBox.textContent = projectElement.getPriority();

        projectCard.appendChild(projectNameHeader);
        projectCard.appendChild(projectDescriptionBox);
        projectCard.appendChild(projectDueDateElement);
        projectCard.appendChild(projectPriorityBox);

        return projectCard;
    }

    const logProjects = function() {
        console.log(projectList);
    }

    const renderProjects = function(projectList) {
        projectList.forEach(function(item) {
            console.log(typeof(item));
            let newProjectElement = createProjectElement(item);
            console.log(typeof(newProjectElement));
            rootNode.appendChild(newProjectElement);
        });

    }


    return {
        log,
        createProjectElement,
        createNavBar,
        // addProject,
        // deleteProject,
        renderProjects,
        logProjects,
    }
})()

export  { PageDOM };