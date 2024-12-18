/// <reference types='cypress' />

context("Variables", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("todos").as('todos');
  });

  it("Test 01", () => {
    cy.get(".new-todo").type("Something...{enter}");
    cy.get(".todo-list li").as("items");
    cy.get("@items").should("have.length", 3);
    cy.get(".todo-list li").should("have.length", 3);
  });

  it("Test #4: Assertions", () => {
    //PASO 1: Validar longitud inicial de la lista "tareas to-do"
    cy.get(".todo-list li").should("have.length", 2);
    //PASO 2: Agregar una tarea
    cy.get(".new-todo").type("My long task #1{enter}");
    //PASO 3: Validar nueva longitud d la lista
    cy.get(".todo-list li").should("have.length", 3);
    //PASO 4:Marcar la primera tarea como completada
    cy.contains(".todo-list li", "My long task #1").find(".toggle").click();
    // PASO 5: Validar que la tarea está marcada como completada
    cy.get('label:contains("My long task #1")')
      .parent()
      .parent()
      .should("have.class", "completed");
  });

  it.only("Test 02", () => {
    // Cargar el fixture y almacenar los datos en un alias
    cy.fixture("todos").as("todos");

    // Usar el alias para añadir las tareas al campo correspondiente
    cy.get("@todos").then((todos) => {
      todos.todos.forEach(todo=> {
        cy.get(".new-todo").type(todo + "{enter}");
      });
    });
  });
});
