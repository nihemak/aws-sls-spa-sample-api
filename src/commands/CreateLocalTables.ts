import { Todos } from "../models/Todos";

new Todos()
.createTable()
.then(() => {
  console.log("Tables has been created");
})
.catch(error => {
  console.error("Error creating tables: " + error);
});
