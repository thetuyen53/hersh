gulp         = require 'gulp'
sync         = require('browser-sync').create()
notify       = require 'gulp-notify'

coffee       = require 'gulp-coffee'

source       = require 'vinyl-source-stream'
buffer       = require 'vinyl-buffer'
uglify       = require 'gulp-uglify'
clean        = require 'gulp-clean-css'
htmlmin      = require 'gulp-htmlmin'
concat       = require 'gulp-concat'
stylus       = require 'gulp-stylus'
pug          = require 'gulp-pug'
sourcemaps   = require 'gulp-sourcemaps'
gulpif       = require 'gulp-if'
fs           = require 'fs'
objectus     = require 'objectus'

env = 'dev'

dirs =
  coffee: 'resources/coffee'
  pug:    'resources/views'
  stylus: 'resources/stylus'
  svg:    'resources/vector'

objectify = ->
  config = {}
  objectus 'config/', (error, result) ->
    notify error if error
    config = result
  return config

config = objectify()

gulp.task 'objectus', objectify

gulp.task 'goprod', ->
  env = 'prod'

gulp.task 'vendor', ->
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
  ])
  .pipe(gulpif(env != 'dev',uglify()))
  .pipe(concat('vendor.js'))
  .pipe gulp.dest('public/js/')

gulp.task 'coffee', ->

  fs.writeFileSync('public/js/config.js', "var config = " + JSON.stringify(config) + ";", 'utf8')

  gulp.src(dirs.coffee + '/*.coffee')
    .pipe(gulpif(env == 'dev', sourcemaps.init(loadMaps: true)))
    .pipe(coffee(bare: true)
      .on('error', notify.onError((error) ->
        title: "Coffee error"
        message: error.message + "\r\n" + error.filename + ':' + error.location.first_line
        sound: 'Pop'
      )))
    .pipe(gulpif(env != 'dev',uglify()))
    .pipe(concat('bundle.js'))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('./public/js'))
    .pipe(sync.stream())

gulp.task 'stylus', ->
  gulp.src(dirs.stylus + '/main.styl')
    .pipe(gulpif(env == 'dev',sourcemaps.init(loadMaps: true)))
    .pipe(stylus(rawDefine: config: config)
    .on('error', notify.onError((error) ->
      title: 'Stylus error: ' + error.name
      message: error.message
      sound: 'Pop'
    )))
    .pipe(gulpif(env != 'dev',clean()))
    .pipe(gulpif(env == 'dev',sourcemaps.write()))
    .pipe(gulp.dest('public/css/'))
    .pipe(sync.stream())

gulp.task 'pug', ->
  gulp.src(dirs.pug + '/**/index.pug')
    .pipe(pug(
      pretty: true
      locals:
        config: config
    ).on('error', notify.onError((error) ->
      title: 'Pug error: ' + error.name
      message: error.message
      sound: 'Pop'
    )))
    .pipe(gulpif(env != 'dev',htmlmin(
      collapseWhitespace: true
      processScripts: ['application/ld+json', 'text/javascript']
    )))
    .pipe(gulp.dest('public'))
    .pipe sync.stream()

watch = ->
  gulp.watch 'config/**/*', ['objectus','coffee', 'pug','stylus']
  gulp.watch dirs.coffee + '/**/*.coffee', ['coffee']
  gulp.watch dirs.stylus + '/**/*.styl', ['stylus']
  gulp.watch dirs.pug + '/**/*.pug', ['pug']
  gulp.watch dirs.svg + '/**/*.svg', ['pug']
  gulp.watch 'public/images/**/*', ['pug']

gulp.task 'sync', ->
  sync.init
    notify: false
    open: false
    server: baseDir: 'public/'
    ghostMode:
      clicks: false
      forms: false
      scroll: false
    scrollProportionally: false
  watch()

gulp.task 'watch', watch
gulp.task 'default', ['objectus','stylus','pug','vendor','coffee']
gulp.task 'prod', ['goprod','default']
