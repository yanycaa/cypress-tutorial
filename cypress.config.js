// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     // "baseUrl": "https://example.cypress.io/todo#", //ejemplos 01 y 02
//    "baseUrl": "https://www.wikipedia.org",

//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// }
// );
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.cypress.io/todo#", // Define la URL base para tus pruebas
    reporter: "mochawesome", // Especifica el reportero para los informes
    reporterOptions: {
      reportDir: "cypress/report/mochawesome-report", // Carpeta de salida de los reportes
      overwrite: true, // Sobrescribir reportes existentes
      html: true, // Generar un reporte HTML
      json: false, // No generar un archivo JSON
      timestamp: "mmddyyyy_HHMMss", // Formato de timestamp en el reporte
      reporter: "cypress-allure-plugin",
      reporterOptions: {
        outputDir: "cypress/allure-results",
      },
    },

    setupNodeEvents(on, config) {
      // Aquí puedes agregar eventos adicionales si es necesario
      allureWriter(on, config); // Habilitar Allure
      return config;
    },
    specPattern: "cypress/e2e/tutorial/**/*.cy.{js,jsx,ts,}", // Ubicación de tus archivos de prueba
  },
});
