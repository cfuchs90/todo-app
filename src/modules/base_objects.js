class Todo {
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
}

export { Todo };