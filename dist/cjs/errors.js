"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errors = void 0;
;
;
function _getEnvErrors(data, env) {
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var listErrors = data[env] || [];
  Object.keys(listErrors).forEach(function (field) {
    var listFields = listErrors[field] || [];
    Object.keys(listFields).forEach(function (code) {
      listFields[code] = addExtra(listFields[code], extra);
    });
  });
  return listErrors;
}
function _getError(data, status, code) {
  var listErrors = data['http'][status] || [];
  return {
    code: code,
    message: listErrors[code] || listErrors["default"] || "Erreur wording: ".concat(code)
  };
}
;
function _getErrors(data, env, errors) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var listErrors = data[env] || [];
  var buildErrors = {};
  Object.keys(errors).forEach(function (field) {
    var listFields = listErrors[field] || [];
    var code = errors[field];
    buildErrors[field] = {
      code: code,
      message: listFields[code] || listFields["default"] || "Erreur wording: ".concat(code)
    };
    buildErrors[field].message = addExtra(buildErrors[field].message, extra);
  });
  return buildErrors;
}
;
function addExtra(message) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var text = message;
  Object.keys(extra).forEach(function (key) {
    text = text.replace("{{".concat(key, "}}"), extra[key]);
  });
  return text;
}
;
var errors = exports.errors = function errors(data) {
  return {
    getEnvErrors: function getEnvErrors(env, extra) {
      return _getEnvErrors(data, env, extra);
    },
    getError: function getError(status, code) {
      return _getError(data, status, code);
    },
    getErrors: function getErrors(env, errors, extra) {
      return _getErrors(data, env, errors, extra);
    }
  };
};
//# sourceMappingURL=errors.js.map