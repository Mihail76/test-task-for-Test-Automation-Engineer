
/// <reference types="cypress" />
import cucumber from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import cypressOnFix from 'cypress-on-fix';
import setupPlugins from './cypress/plugins';

export default {
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    videosFolder: 'cypress/videos',
    chromeWebSecurity: false,
    viewportHeight: 720,
    viewportWidth: 1280,
    videoCompression: 1,
    pageLoadTimeout: 300000,
    async setupNodeEvents(
      cypressOn: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      const on = cypressOnFix(cypressOn);

      await cucumber.addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          // @ts-ignore
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return setupPlugins(on, config);
    },
  },
  env: {
    allure: true,
    allureSkipSteps:
      '"after each" hook*,"before each" hook*,"before all" hook*,Before*,BeforeStep*,After*',
    specDefinitions: 'cypress/e2e/**/*.ts',
  },
};
