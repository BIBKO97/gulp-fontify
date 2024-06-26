# gulp-fontify

Encode font files as CSS using [Gulp](http://gulpjs.com).

This plugin automates the conversion of font files into a series of `@font-face` declarations containing each font encoded in base64.

The resulting CSS files then could be used in many ways.

## Install

```
$ npm install --save-dev gulp-fontify
```

## Usage

```js
var gulp     = require('gulp')
var concat   = require('gulp-concat')
var fontify  = require('gulp-fontify')

gulp.task('fonts', function() {
    return gulp.src('YOUR_SOURCE_PATH/**/*.{otf,ttf,woff,woff2}')
        .pipe(fontify.default())
        .pipe(concat('fonts.css'))
        .pipe(gulp.dest('YOUR_DESTINATION_PATH/'))
})
```

## Input files

`@font-face` property values are determined by the input file names, which must obey the following naming scheme with dash-separated attributes:

`[<font-family>][-<font-weight>][-<font-style>].[<extension>]`

`[<font-family>]` is the name of the font family. It is required.

`[<font-weight>]` is the weight of the font. It is optional. It should be one of `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`. You may also provide a [commonly used weight name](http://www.w3.org/TR/css3-fonts/#font-weight-numeric-values) (except `normal`) that maps to one of these values.

`[<font-style>]` is the style of the font. It is optional. It should be one of `normal`, `italic` or `oblique`.

`[<extension>]` is the file extension of the font file. It is required. It should be one of `otf`, `ttf`, `woff`, `woff2`.


For example, the following are valid names:

* `Lato.woff`
* `Lato-italic.woff`
* `Lato-bold.woff`
* `Lato-700.woff`
* `Lato-thin-italic.woff`
* `Lato-100-italic.woff`

The plugin will ignore any unknown keywords.

## Inspirations

* This project draws inspiration from [localFont](http://jaicab.com/localFont/), created by Jaime Caballero.
* Another source of inspiration is [Luís Rodrigues](https://github.com/goblindegook) and his [gulp-font2css](https://www.npmjs.com/package/gulp-font2css) package.

## License

<div style="background: linear-gradient(135deg, #663399, #3E50B4); border-radius: 10px; padding: 20px; color: #fff; margin-bottom: 1rem">
    <div><p style="margin: 0; color: white">© MIT License</p><a href="https://github.com/BIBKO97"><strong style="color: #B0E0E6">BIBKO97</strong></a></div>
</div>
