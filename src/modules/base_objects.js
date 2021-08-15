class Task {
    constructor(name, description, dueDate, priority) {
        this.name = name,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    }

    log() {
        console.log(this.name);
        console.log(this.description);
        console.log(this.dueDate);
        console.log(this.priority);
    }

    setName = function(newName)  {
        this.name = newName;
    }

    getName = function()  {
        return this.name;
    }

    setDescription = function (newDescription) {
        this.description = newDescription;
    }

    getDescription = function()  {
        return this.description;
    }

    setPriority = function(newPriority)  {
        this.priority = newPriority;
    }

    getPriority = function() {
        return this.priority;
    }

    setDueDate = function(newDueDate) {
        this.dueDate = newDueDate;
    }

    getDueDate = function() {
        return this.dueDate;
    }
}

class Project extends Task {
    constructor(name, description, priority, dueDate) {
        super(name, description, priority, dueDate);
    }

    // Array containing all the task associated with the project
    taskList = [];

    addTask = function(taskToAdd) {
        this.taskList.push(taskToAdd);
    }

    deleteTask = function(taskName) {
        console.log(this.taskList.filter(item => item.name != taskName));
    }

    logTasks = function() {
        console.log(this.taskList);
    }
}


const ProjectContainer = (function() {
    let projectList = [];

    const logProjects = function() {
        console.log(projectList);
    }

    
    const addProject = function(newProject) {
        projectList.push(newProject);
    }

    const deleteProject = function(projToDelete) {
        projectList = projectList.filter(item => item.getName() != projToDelete);
    }

    const getProjects = function() {
        return projectList;
    }

    return({
        logProjects,
        addProject,
        deleteProject,
        getProjects,
    })
}())

export { Project, Task, ProjectContainer };