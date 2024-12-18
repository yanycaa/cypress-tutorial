// Primer parámetro: nombre, segundo: "la función"
context("Example 01", () => {
  beforeEach(() => {
    cy.visit("/"); // Comando de Cypress para navegar a una URL determinada.
    // Dado que definimos la "baseUrl", podemos navegar directamente.
  });

  it("Test #1", () => {
    cy.get(".new-todo").type("My long task #1{enter}");
    cy.get(".new-todo").type("My long task #2{enter}");
    cy.contains("Completed").click();
    cy.contains("Active").click();
  });

  it("Test #1 con selectores XPath", () => {
    cy.xpath('//input[@class="new-todo"]').type("My long task #1{enter}");
    // Paso 3: Añadir la segunda tarea utilizando XPath
    cy.xpath('//input[@class="new-todo"]').type("My long task #2{enter}");
    // Paso 4: Cambiar a la vista de tareas completadas utilizando XPath
    cy.xpath('//a[text()="Completed"]').click();
    // Paso 5: Cambiar a la vista de tareas activas utilizando XPath
    cy.xpath('//a[text()="Active"]').click();
  });

  it("Test #2: Select using CSS selectors", () => {
    cy.get(".new-todo").type("My long task #1{enter}");

    // Añadir la segunda tarea
    cy.get(".new-todo").type("My long task #2{enter}");

    // Encontrar el segundo elemento de la lista y marcarlo como completado
    cy.get(".todo-list li").eq(1).find(".toggle").click();

    // Cambiar a la vista de tareas completadas
    cy.contains("Completed").click();
  });

  it("Test #3: Select using Text Content", () => {
    // Añadir la primera tarea
    cy.get(".new-todo").type("My long task #1{enter}");

    // Añadir la segunda tarea
    cy.get(".new-todo").type("My long task #2{enter}");

    //  Encontrar una tarea por su texto y marcarla como completada
    cy.contains("My long task #2") // Encuentra el label con el texto
      .parent() // Accede al elemento padre
      .find(".toggle") // Encuentra el toggle dentro del padre
      .click(); // Marca la tarea como completada

    // Cambiar a la vista de tareas completadas
    cy.contains("Completed").click();
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

  it.only("Test #5: Reversing the Default Assertions", () => {
    //PASO 1: Comportamiento controlado
    cy.get(".button-close").should("not.exist");
    //PASO 2: Comportamiento por defecto al utilizar cy.get
    // cy.get(".button-close"); // No lo encuentra, la prueba falla.
  });
});
