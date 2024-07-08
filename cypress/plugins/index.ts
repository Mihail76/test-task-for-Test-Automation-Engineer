const plugins = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'firefox') {
      // eslint-disable-next-line no-param-reassign
      launchOptions.preferences['intl.accept_languages'] = 'ru-RU, ru';
    }

    return launchOptions;
  });

  return config;
};

export default plugins;
