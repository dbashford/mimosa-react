"use strict";

var config = require( "./config" )
  , extensions = function ( mimosaConfig ) {
    return mimosaConfig.react.extensions;
  };

var compile = function ( mimosaConfig, file, cb ) {
  var output = {}
    , error
    , mapText;

  try {
    output = mimosaConfig.react.lib.transformWithDetails( file.inputFileText, mimosaConfig.react.options );
  } catch ( err ) {
    error = err;
  }

  if ( output.sourceMap ) {
    mapText = JSON.stringify( output.sourceMap );
  }

  cb( error, output.code, mimosaConfig.react, mapText );
};

module.exports = {
  name: "react",
  compilerType: "javascript",
  compile: compile,
  extensions: extensions,
  defaults: config.defaults,
  validate: config.validate
};
