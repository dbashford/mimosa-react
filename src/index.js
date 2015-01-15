"use strict";

var config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.react.extensions;
  };

var compile = function ( mimosaConfig, file, cb ) {
  var output
    , error
    , mapText;

  if ( file.inputFileText.indexOf( "@jsx React.DOM" ) === -1 ) {
    file.inputFileText = "/** @jsx React.DOM */\n" + file.inputFileText;
  }

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
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
