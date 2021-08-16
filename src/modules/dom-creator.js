import { Task, Project, ProjectContainer } from "./base_objects";
import { format } from "date-fns";
import "../styles/main-style.scss";

const PageDOM = (function() {
    const rootNode = document.querySelector(".project-container");
    const headerNode = document.querySelector("header");
    const formArea = document.querySelector(".form-area");

    const formWrapInParagraph = function(labelElement, inputElement) {
        let paragraphWrapper = document.createElement("p");
        paragraphWrapper.appendChild(labelElement);
        paragraphWrapper.appendChild(inputElement);

        return paragraphWrapper;
    }


    const formPriorityOptions = function(isProject = true) {
        if(isProject) {
            var specifier = "project"
        } else {
            var specifier = "task"
        }

        let selectElement = document.createElement("select");
        let selectLabel = document.createElement("label")
        let priorityCodes = [1, 2, 3, 4, 5];

        selectElement.id = "new-" + specifier + "-priority";

        selectLabel.htmlFor = selectElement.id;
        selectLabel.textContent = "Priority"
        
        priorityCodes.forEach(item => {
            let optionElement = document.createElement("option");
            optionElement.textContent = item;
            selectElement.appendChild(optionElement);
        })

        return formWrapInParagraph(selectLabel, selectElement);
    }


    const createNewProjectForm = function(isProject = true) {
        if(isProject) {
            var specifier = "project";
            var labelPrefix = "Project ";
        } else {
            var specifier = "task"
            var labelPrefix = "Task ";
        }

        let nameId = "new-" + specifier + "-name";
        let descriptionId = "new-" + specifier + "-description";
        let dueDateId = "new-" + specifier + "-duedate";

        // create project form elements
        let formDiv = document.createElement("div");
        formDiv.classList.add("form-container");

        let formFieldSet = document.createElement("fieldset");
        let formElement = document.createElement("form");
        let formInputName = document.createElement("input");
        let formInputDescription = document.createElement("textarea");
        let formInputDueDate = document.createElement("input");
        let formAddProjectButton = document.createElement("button");


        formInputDueDate.setAttribute("type", "date");

        formInputName.id = nameId;
        formInputDescription.id = descriptionId;
        formInputDueDate.id = dueDateId;

        // projectFormInputName.id = "new-" + specifier + "-name";
        // projectFormInputDescription.id = "new-" + specifier + "-description";
        // projectFormInputDueDate.id = "new-" + specifier + "-duedate";

        // create project form Labels
        let formLabelName = document.createElement("label");
        let formLabelDescription = document.createElement("label");
        let formLabelDueDate = document.createElement("label");

        formLabelName.htmlFor = nameId;
        formLabelDescription.htmlFor = descriptionId;
        formLabelDueDate.htmlFor = dueDateId;

        formLabelName.textContent = labelPrefix + "Name";
        formLabelDescription.textContent = labelPrefix + "Description";
        formLabelDueDate.textContent = labelPrefix + "Date";

        // button to add project to the projectList of the ProjectContainer
        formAddProjectButton.textContent = "Add " + labelPrefix;

        formAddProjectButton.addEventListener("click", function(e) {
            e.preventDefault();

            let newName = document.querySelector("#" + nameId).value;
            let newDescription = document.querySelector("#" + descriptionId).value;
            let newDueDate = document.querySelector("#" + dueDateId).value;
            let newPriority = document.querySelector("#new-project-priority").value;

            
            // create Project element from form data
            if(newName && newDescription && newDueDate && newPriority) {
                let newDueDateFormatted = format(new Date(newDueDate), "dd.MM.yyyy");

                if(isProject) {
                    let newProject = new Project(newName, newDescription, newDueDateFormatted, newPriority);
                    ProjectContainer.addProject(newProject);
                    ProjectContainer.logProjects();
                }

            formArea.style.display = "none";
            clearFormArea();
            renderProjects(ProjectContainer.getProjects());
            }
        });

        // create paragraph wrapper for form elements
        let formNameParagraph = formWrapInParagraph(formLabelName, formInputName);
        let formDescriptionParagraph = formWrapInParagraph(formLabelDescription, formInputDescription);
        let formDueDateParagraph = formWrapInParagraph(formLabelDueDate, formInputDueDate);
        let formPrioritySelection = formPriorityOptions();

        // append label and input elements to form element
        formElement.appendChild(formNameParagraph);
        formElement.appendChild(formDescriptionParagraph);
        formElement.appendChild(formDueDateParagraph);
        formElement.appendChild(formPrioritySelection);
        formElement.appendChild(formAddProjectButton);

        formFieldSet.appendChild(formElement);
        formDiv.appendChild(formFieldSet);

        // append form element to the main form-container element 
        formArea.appendChild(formDiv);
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

        linkItemNewProject.addEventListener("click", function(e) {
            formArea.style.display = "block";
            createNewProjectForm();
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
        let projectAddTaskButton = document.createElement("button");

        projectCard.classList.add("project-card");

        projectNameHeader.textContent = projectElement.getName();
        projectDescriptionBox.textContent = projectElement.getDescription();
        projectDueDateElement.textContent = projectElement.getDueDate();
        projectPriorityBox.textContent = projectElement.getPriority();
        projectAddTaskButton.textContent = "New Task";

        projectCard.appendChild(projectNameHeader);
        projectCard.appendChild(projectDescriptionBox);
        projectCard.appendChild(projectDueDateElement);
        projectCard.appendChild(projectPriorityBox);
        projectCard.appendChild(projectAddTaskButton);

        return projectCard;
    }

    const logProjects = function() {
        console.log(projectList);
    }

    const renderProjects = function(projectList) {
        clearProjectArea();
        projectList.forEach(function(item) {
            let newProjectElement = createProjectElement(item);
            rootNode.appendChild(newProjectElement);
        });

    }

    const clearProjectArea = function() {
        // console.log(rootNode.children);
        let childElements = rootNode.childNodes;

        // childElements.forEach(item => rootNode.removeChild(item));
        while(rootNode.firstChild) {
            rootNode.removeChild(rootNode.firstChild);
        }
    }


    const clearFormArea = function() {
        while(formArea.lastChild) {
            formArea.removeChild(formArea.firstChild);
        }
    }


    return {
        log,
        createProjectElement,
        createNavBar,
        // addProject,
        // deleteProject,
        renderProjects,
        logProjects,
        createNewProjectForm,
        clearProjectArea,
    }
})()

export  { PageDOM };