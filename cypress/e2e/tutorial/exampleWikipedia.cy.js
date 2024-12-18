context("Wikipedia", () => {
  beforeEach(() => {
    cy.visit("https://www.wikipedia.org"); // Comando de Cypress para navegar a una URL determinada.
    // Dado que definimos la "baseUrl", podemos navegar directamente.
  });

  it("Test 01 - BDD Expectations", () => {
    // Localizar el campo de búsqueda y escribir "Globant"
    cy.get("input#searchInput") // Selector del campo de búsqueda en Wikipedia
      .type("Globant{enter}"); // Ingresar texto y presionar Enter

    // Esperar un tiempo específico para que los resultados carguen
    cy.wait(5000); // Esperar 5 segundos (ajusta según el tiempo de carga esperado)

    // Verificar que el logo de Globant es visible en la página
    cy.get(".infobox img").eq(0).should("be.visible");
    // Asegúrate de que el título esté visible antes de continuar con las aserciones;
    cy.get(".mediawiki #firstHeading").should("be.visible");
    // Localizar y validar el título 'Globant'
    cy.get("#firstHeading") // Selector del encabezado del artículo principal
      .should("be.visible") // Verificar visibilidad
      .and("include.text", "Globant"); // Validar que contiene la palabra 'Globant'
  });

  it("Test 02 - Implicit Wait", () => {
    cy.get("#www-wikipedia-org #searchInput").type("Globant {enter}");
    cy.wait(6000);
    //Antes de jacer las assertions, nos aseguramos q estuviera cargaa
    cy.get(".mediawiki #firstHeading").should("be.visible");
    cy.get(".mediawiki #firstHeading").should("contain", "Globant");
  });
});
