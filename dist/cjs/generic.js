"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generic = void 0;
;
;
var getById = function getById(data) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  return data.find(function (item) {
    return item.id === id;
  }) || data.find(function (item) {
    return item.id === -1;
  });
};
var _filterNoDefault = function filterNoDefault(data) {
  return data.filter(function (row) {
    return row.id > -1;
  });
};
var gen = function gen(data) {
  return {
    value: data,
    get: function get() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return getById(data, id);
    },
    getLabel: function getLabel() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return getById(data, id).label;
    },
    filterNoDefault: function filterNoDefault() {
      return _filterNoDefault(data);
    }
  };
};
var handler = {
  get: function get(target, prop) {
    if (Array.isArray(target)) {
      return gen(target);
    }
    if (prop in target) {
      var data = target[prop];
      return Array.isArray(data) ? gen(target[prop]) : new Proxy(data, handler);
    }
    return [];
  }
};
var generic = exports.generic = function generic(data) {
  return new Proxy(data, handler);
};
//# sourceMappingURL=generic.js.map