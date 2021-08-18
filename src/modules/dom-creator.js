import { Task, Project, ProjectContainer } from "./base_objects";
import { format } from "date-fns";
import "../styles/main-style.scss";

const PageDOM = (function() {
    const rootNode = document.querySelector(".project-container");
    const headerNode = document.querySelector("header");


    const createNavBar = function() {
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
            FormCreator.createNewElementForm();
        });

        linkItemShowProjects.appendChild(linkItemShowProjectsText);
        linkItemNewProject.appendChild(linkItemNewProjectText);
        
        navBarList.appendChild(linkItemShowProjects);
        navBarList.appendChild(linkItemNewProject);


        navBarElement.appendChild(navBarList);
        navBarElement.classList.add("nav-bar");

        headerNode.appendChild(navBarElement);
    }


    const createCardElement = function(baseObjectElement) {
        let isProject = baseObjectElement instanceof Project;

        let card = document.createElement("div");
        let nameHeader = document.createElement("h1");
        let descriptionBox = document.createElement("p");
        let dueDateElement = document.createElement("span");
        let priorityBox = document.createElement("h1");
        let doneCheckboxElement = document.createElement("input");
        let doneCheckboxLabel = document.createElement("label");

        nameHeader.textContent = baseObjectElement.getName();
        descriptionBox.textContent = baseObjectElement.getDescription();
        dueDateElement.textContent = baseObjectElement.getDueDate();
        priorityBox.textContent = baseObjectElement.getPriority();

        // Done Checkbox
        doneCheckboxElement.setAttribute("type", "checkbox");
        doneCheckboxElement.id = "done-" + baseObjectElement.getName();
        doneCheckboxLabel.textContent = "Done?";
        doneCheckboxLabel.htmlFor = doneCheckboxElement.id;

        doneCheckboxElement.addEventListener("change", function(e) {
            let localRootNode = e.target.parentNode.parentNode;
            localRootNode.removeChild(e.target.parentNode);

            if(isProject) {
                ProjectContainer.deleteProject(baseObjectElement.getName());
                console.log(ProjectContainer.getProjects());
            } else {
                baseObjectElement.setDone();
                ProjectContainer.getProjects().forEach(projectElement => {
                    projectElement.deleteDoneTasks();
                })
            }
        });

        card.appendChild(nameHeader);
        card.appendChild(descriptionBox);
        card.appendChild(dueDateElement);
        card.appendChild(priorityBox);
        card.appendChild(doneCheckboxLabel);
        card.appendChild(doneCheckboxElement);

        if(isProject) {
            let taskContainer = document.createElement("div");
            let taskContainerVisible = false;
            let addTaskButton = document.createElement("button");
            let expandTasksButton = document.createElement("span");

            addTaskButton.textContent = "New Task";
            expandTasksButton.textContent = ">";

            taskContainer.classList.add("task-container");
            taskContainer.appendChild(renderTasks(baseObjectElement.getTasks()));

            addTaskButton.addEventListener("click", function(e) {
                let currentProjectName = baseObjectElement.getName()
                FormCreator.createNewElementForm(currentProjectName);
            });

            expandTasksButton.addEventListener("click", function(e) {
                e.preventDefault();
                if(!taskContainerVisible) {
                    taskContainerVisible = true;
                    taskContainer.style.display = "block";
                } else {
                    taskContainer.style.display = "none";
                    taskContainerVisible = false;
                }
            })

            card.appendChild(addTaskButton);
            card.appendChild(taskContainer);
            card.appendChild(expandTasksButton);
            card.classList.add("project-card");
        } else {
            card.classList.add("task-card");
        }

        return card;
    }


    const logProjects = function() {
        console.log(projectList);
    }

    const renderProjects = function(projectList) {
        clearProjectArea();
        projectList.forEach(function(item) {
            let newProjectElement = createCardElement(item);
            rootNode.appendChild(newProjectElement);
        });

    }

    const renderTasks = function(taskList) {
        let taskArea = document.createElement("div");

        taskList.forEach(item => {
            let taskElement = createCardElement(item);
            taskArea.appendChild(taskElement);
        })

        return (taskArea);
    }

    const clearProjectArea = function() {
        while(rootNode.firstChild) {
            rootNode.removeChild(rootNode.firstChild);
        }
    }

    return {
        createCardElement,
        createNavBar,
        renderProjects,
        logProjects,
        clearProjectArea,
    }
})()


const FormCreator = (function() {
    const formArea = document.querySelector(".form-area");

    const formWrapInParagraph = function(labelElement, inputElement) {
            let paragraphWrapper = document.createElement("p");
            paragraphWrapper.appendChild(labelElement);
            paragraphWrapper.appendChild(inputElement);

            return paragraphWrapper;
        }


    const createNewElementForm = function(projectName = "") {
        const priorityCodes = [1, 2, 3, 4, 5];
        const projNameDefined = projectName !== "";

        if(projNameDefined) {
            var specifier = "task"
            var labelPrefix = "Task ";
        } else {
            var specifier = "project";
            var labelPrefix = "Project ";
        }

        let nameId = "new-" + specifier + "-name";
        let descriptionId = "new-" + specifier + "-description";
        let dueDateId = "new-" + specifier + "-duedate";
        let priorityId = "new-" + specifier + "-priority";

        // create project form elements
        let formDiv = document.createElement("div");
        formDiv.classList.add("form-container");

        let formFieldSet = document.createElement("fieldset");
        let formElement = document.createElement("form");
        let formInputName = document.createElement("input");
        let formInputDescription = document.createElement("textarea");
        let formInputDueDate = document.createElement("input");
        let formAddProjectButton = document.createElement("button");
        let formCloseButton = document.createElement("span");
        let formSelectElement = document.createElement("select");

        priorityCodes.forEach(item => {
                    let optionElement = document.createElement("option");
                    optionElement.textContent = item;
                    formSelectElement.appendChild(optionElement);
                })

        formCloseButton.innerHTML = "&times;";

        formInputDueDate.setAttribute("type", "date");

        formInputName.id = nameId;
        formInputDescription.id = descriptionId;
        formInputDueDate.id = dueDateId;
        formSelectElement.id = priorityId;


        // create project form Labels
        let formLabelName = document.createElement("label");
        let formLabelDescription = document.createElement("label");
        let formLabelDueDate = document.createElement("label");
        let formLabelSelect = document.createElement("label")

        formLabelName.htmlFor = nameId;
        formLabelDescription.htmlFor = descriptionId;
        formLabelDueDate.htmlFor = dueDateId;
        formLabelSelect.htmlFor = priorityId;

        formLabelName.textContent = labelPrefix + "Name";
        formLabelDescription.textContent = labelPrefix + "Description";
        formLabelDueDate.textContent = labelPrefix + "Date";
        formLabelSelect.textContent = "Priority";

        // button to add project to the projectList of the ProjectContainer
        formAddProjectButton.textContent = "Add " + labelPrefix;

        formAddProjectButton.addEventListener("click", function(e) {
            e.preventDefault();

            let newName = document.querySelector("#" + nameId).value;
            let newDescription = document.querySelector("#" + descriptionId).value;
            let newDueDate = document.querySelector("#" + dueDateId).value;
            let newPriority = document.querySelector("#" + priorityId).value;

            
            // create Project or Task object from form data and add to appropriate place
            if(newName && newDescription && newDueDate && newPriority) {
                let newDueDateFormatted = format(new Date(newDueDate), "dd.MM.yyyy");

                if(projNameDefined) {
                    let newTask = new Task(newName, newDescription, newDueDateFormatted, newPriority);
                    let currentProject = ProjectContainer.getProjectByName(projectName);
                    currentProject.addTask(newTask);
                } else {
                    let newProject = new Project(newName, newDescription, newDueDateFormatted, newPriority);
                    ProjectContainer.addProject(newProject);
                }

            formArea.style.display = "none";
            clearFormArea();
            PageDOM.renderProjects(ProjectContainer.getProjects());
            }
        });

        // close button event listener
        formCloseButton.addEventListener("click", function(e) {
            formArea.style.display = "none";
            clearFormArea();
        });

        // create paragraph wrapper for form elements
        let formNameParagraph = formWrapInParagraph(formLabelName, formInputName);
        let formDescriptionParagraph = formWrapInParagraph(formLabelDescription, formInputDescription);
        let formDueDateParagraph = formWrapInParagraph(formLabelDueDate, formInputDueDate);
        let formPrioritySelection = formWrapInParagraph(formLabelSelect, formSelectElement);

        // append label and input elements to form element
        formElement.appendChild(formNameParagraph);
        formElement.appendChild(formDescriptionParagraph);
        formElement.appendChild(formDueDateParagraph);
        formElement.appendChild(formPrioritySelection);
        formElement.appendChild(formAddProjectButton);
        formElement.appendChild(formCloseButton);

        formFieldSet.appendChild(formElement);
        formDiv.appendChild(formFieldSet);

        // append form element to the main form-container element 
        formArea.style.display = "block";
        formArea.appendChild(formDiv);
    }


    const clearFormArea = function() {
        while(formArea.lastChild) {
            formArea.removeChild(formArea.firstChild);
        }
    }


    return {
        createNewElementForm
    }

}())

export  { PageDOM };