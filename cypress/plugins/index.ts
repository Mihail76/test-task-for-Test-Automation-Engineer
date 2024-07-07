type TBrowser = { family: string; name: string };
type TLaunchOptions = {
  preferences: {
    'intl.accept_languages': string;
    default: {
      download: {
        default_directory: string;
      };
    };
  };
};

type TOnActionCallback = (browser: TBrowser, launchOptions: TLaunchOptions) => TLaunchOptions;
type TOnAction = (event: string, callback: TOnActionCallback) => void;
type TConfig = Cypress.PluginConfigOptions;

const plugins = (on: TOnAction, config: TConfig) => {
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
