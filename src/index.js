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


ProjectContainer.addProject(firstProject);
ProjectContainer.addProject(secondProject);

let bla = ProjectContainer.getProjectByName("new project2");
console.log(bla);


PageDOM.createNavBar(["Show Projects", "New Project"]);

PageDOM.renderProjects(ProjectContainer.getProjects());
// PageDOM.createNewProjectForm();
