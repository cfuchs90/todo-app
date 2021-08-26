class Task {
    constructor(name, description, priority, dueDate, done = false) {
        this.name = name,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.done = done
    }

    log() {
        console.log(this.name);
        console.log(this.description);
        console.log(this.dueDate);
        console.log(this.priority);
        console.log(this.done);
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

    setDone = function() {
        this.done = true;
    }
}


class Project extends Task {
    constructor(name, description, priority, dueDate, done) {
        super(name, description, priority, dueDate, done);
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

    deleteDoneTasks = function() {
        this.taskList = this.taskList.filter(item => item.done == false)
    }

    getTasks = function() {
        return this.taskList;
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


    const getProjectByName = function(searchName) {
        return projectList.find(item => item.getName() == searchName)
    }


    const saveProjects = function() {
        console.log(JSON.stringify(projectList));
    }

    
    const loadProjects = function() {
        fetch("http://localhost:3000/getprojects")
        .then(response => response.json())
        .then(data => {
            data.forEach(projectItem => {
                let newLoadedProject = new Project(projectItem.name, projectItem.description, projectItem.priority, projectItem.dueDate, projectItem.done);

                projectItem.taskList.forEach(taskItem =>{
                    let newLoadedTask = new Task(taskItem.name, taskItem.description, taskItem.priority, taskItem.dueDate, taskItem.done);
                    newLoadedProject.addTask(newLoadedTask);
                });

                ProjectContainer.addProject(newLoadedProject);
                // console.log();
                // console.log(projectItem.taskList);
            })
        });
        
    }


    return({
        logProjects,
        addProject,
        deleteProject,
        getProjects,
        getProjectByName,
        saveProjects,
        loadProjects
    })
}())

export { Project, Task, ProjectContainer };