import { Todo } from "./modules/base_objects";
import { format } from "date-fns";

let firstItem = new Todo("a todo", "a todo description", 5, format(new Date(Date.now()), "dd.MM.yyyy"));

firstItem.log();
