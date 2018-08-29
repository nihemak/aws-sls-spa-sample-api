import { Todos } from "../models/Todos";

new Todos()
.createTable(1 /* readCapacity */, 1 /* writeCapacity */)
.then(() => {
  console.log("Tables has been created");
})
.catch(error => {
  console.error("Error creating tables: " + error);
});
