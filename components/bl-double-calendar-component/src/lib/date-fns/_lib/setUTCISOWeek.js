"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISOWeek;

var _index = _interopRequireDefault(require("./toInteger.js"));

var _index2 = _interopRequireDefault(require("../toDate.js"));

var _index3 = _interopRequireDefault(require("./getUTCISOWeek.js"));

var _index4 = _interopRequireDefault(require("./requiredArgs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var isoWeek = (0, _index.default)(dirtyISOWeek);
  var diff = (0, _index3.default)(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

module.exports = exports.default;