export interface NestedSchemas {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    }
  }
};

export interface arrayObject {
  [key: string]: string;
};

function getEnvErrors(data: NestedSchemas, env: string, extra: arrayObject = {}) {
  const listErrors = data[env] || [];
  Object.keys(listErrors).forEach((field) => {
    const listFields = listErrors[field] || [];
    Object.keys(listFields).forEach((code) => {
      listFields[code] = addExtra(listFields[code], extra);
    });
  });
  return listErrors;
}

function getError(data: NestedSchemas, status: string, code: string) {
  const listErrors = data['http'][status] || [];
  return {
    code,
    message: listErrors[code] || listErrors["default"] || `Erreur wording: ${code}`,
  };
};

function getErrors(data: NestedSchemas, env: string, errors: arrayObject, extra: arrayObject = {}) {
  const listErrors = data[env] || [];
  const buildErrors: any = {};
  Object.keys(errors).forEach((field) => {
    const listFields = listErrors[field] || [];
    const code = errors[field];
    buildErrors[field] = {
      code,
      message: listFields[code] || listFields["default"] || `Erreur wording: ${code}`,
    };
    buildErrors[field].message = addExtra(buildErrors[field].message, extra);
  });
  return buildErrors;
};

function addExtra(message: string, extra: arrayObject = {}) {
  let text = message;
  Object.keys(extra).forEach((key) => {
    text = text.replace(`{{${key}}}`, extra[key]);
  });
  return text;
};

export const errors = (data: NestedSchemas) => ({
  getEnvErrors: (env: string, extra: arrayObject) => getEnvErrors(data, env, extra),
  getError: (status: string, code: string) => getError(data, status, code),
  getErrors: (env: string, errors: arrayObject, extra: arrayObject) => getErrors(data, env, errors, extra),
});
