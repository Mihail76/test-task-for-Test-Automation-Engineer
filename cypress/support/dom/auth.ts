import { CLASS_AUTH_FORM } from '../../fixtures/auth';
import type { TOptions } from './types';

const getByClassName = (className: string, options?: TOptions) => {
  return cy.get(`.${className}`, options);
};

const getAuthForm = (options?: TOptions) => {
  return getByClassName(CLASS_AUTH_FORM, options);
};

const auth = {
  getAuthForm,
};

export default auth;
