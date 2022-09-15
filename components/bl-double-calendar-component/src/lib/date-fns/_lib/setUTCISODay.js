"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISODay;

var _index = _interopRequireDefault(require("../toDate.js"));

var _index2 = _interopRequireDefault(require("./requiredArgs.js"));

var _index3 = _interopRequireDefault(require("./toInteger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUTCISODay(dirtyDate, dirtyDay) {
  (0, _index2.default)(2, arguments);
  var day = (0, _index3.default)(dirtyDay);

  if (day % 7 === 0) {
    day = day - 7;
  }

  var weekStartsOn = 1;
  var date = (0, _index.default)(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

module.exports = exports.default;