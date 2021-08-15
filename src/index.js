import { Task, Project, ProjectContainer } from "./modules/base_objects";
import { PageDOM } from "./modules/dom-creator";
import { format } from "date-fns";

let firstItem = new Task("a todo", "a todo description", 5, format(new Date(Date.now()), "dd.MM.yyyy"));
let secondItem = new Task("a second todo", "a todo description", 5, format(new Date(Date.now()), "dd.MM.yyyy"));
let thirdItem = new Task("a third todo", "a todo description", 5, format(new Date(Date.now()), "dd.MM.yyyy"));
let firstProject = new Project("new project", "cool project", 1, format(new Date(Date.now()), "dd.MM.yyyy"));
let secondProject = new Project("new project2", "second project", 1, format(new Date(Date.now()), "dd.MM.yyyy"));

firstProject.addTask(firstItem);
firstProject.addTask(secondItem);


secondProject.addTask(thirdItem);

secondProject.log();

ProjectContainer.addProject(firstProject);
ProjectContainer.addProject(secondProject);
ProjectContainer.logProjects();

// PageDOM.log();
// PageDOM.addProject(firstProject)
// PageDOM.addProject(secondProject)
// PageDOM.renderProjects();

PageDOM.createNavBar(["Show Projects", "New Project"]);
