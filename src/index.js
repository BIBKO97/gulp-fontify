'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');
var _path2 = _interopRequireDefault(_path);
var _cssFontStyleKeywords = require('css-font-style-keywords');
var _cssFontStyleKeywords2 = _interopRequireDefault(_cssFontStyleKeywords);
var _cssFontWeightKeywords = require('css-font-weight-keywords');
var _cssFontWeightKeywords2 = _interopRequireDefault(_cssFontWeightKeywords);
var _cssFontWeightNames = require('css-font-weight-names');
var _cssFontWeightNames2 = _interopRequireDefault(_cssFontWeightNames);
var _mime = require('mime');
var _mime2 = _interopRequireDefault(_mime);
var _through = require('through2');
var _through2 = _interopRequireDefault(_through);
var _gulpUtil = require('gulp-util');
var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Extract the `font-family` from the font's file name.
 * @param  {String} basename Font base filename.
 * @return {String}          `font-family` property and value.
 */
function getFontFamily(basename) {
    let parts = basename.split('-');
    let fontFamily = parts.length > 1 ? parts[0] + '-' + parts[1] : parts[0];
    return 'font-family:"' + fontFamily + '";';
}

/**
 * Guess the `font-style` property from the font file name.
 * @param  {String} basename Font base filename.
 * @return {String}          `font-style` property and guessed value.
 */
function guessFontStyle(basename) {
    return basename.split('-').slice(1).map(function (item) {
        return item.toLowerCase();
    }).reduce(function (prev, item) {
        if (_cssFontStyleKeywords2.default.indexOf(item) >= 0) {
            return 'font-style:' + item + ';';
        }

        return prev;
    }, '');
}

/**
 * Guess the `font-weight` property from the font file name.
 * @param  {String} basename Font base filename.
 * @return {String}          `font-weight` property and guessed value.
 */
function guessFontWeight(basename) {
    return basename.split('-').slice(1).map(function (item) {
        return item.toLowerCase();
    }).reduce(function (prev, item) {
        if (item === 'normal') {
            return prev;
        }

        if (_cssFontWeightNames2.default[item]) {
            return 'font-weight:' + _cssFontWeightNames2.default[item] + ';';
        }

        if (_cssFontWeightKeywords2.default.indexOf(item) >= 0) {
            return 'font-weight:' + item + ';';
        }

        return prev;
    }, '');
}

/**
 * Convert file contents to a Base64-encoded data: URL.
 * @param  {Object} file File object.
 * @return {String}      Base64-encoded contents inside a `data:` URL.
 */
function getSrc(file) {
    var encodedContents = new Buffer(file.contents).toString('base64');
    return 'src:url(data:' + _mime2.default.lookup(file.path) + ';charset=utf-8;base64,' + encodedContents + ');';
}

/**
 * Convert fonts to CSS using Gulp.
 *
 * Encodes font files in Base64 inside a CSS `@font-face` rule. The plugin
 * attempts to guess `font-family`, `font-style` and  `font-weight` attributes
 * from the name of each file provided.
 *
 * @return {Object} CSS file object.
 */
function fontify() {
    return _through2.default.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new _gulpUtil2.default.PluginError('gulp-fontify', 'Streaming is not supported'));
            return callback();
        }

        if (file.isBuffer()) {
            var basename = _path2.default.basename(file.path, _path2.default.extname(file.path));

            var attributes = [getFontFamily(basename), guessFontStyle(basename), guessFontWeight(basename), getSrc(file)];

            var contents = '@font-face{' + attributes.join('') + '}';

            file.contents = new Buffer(contents);
            file.path = _gulpUtil2.default.replaceExtension(file.path, '.css');

            return callback(null, file);
        }
    });
}

exports.default = fontify;