"use strict";

var config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.react.extensions;
  };

var compile = function ( mimosaConfig, file, cb ) {
  var output
    , error
    , text = file.inputFileText;

  if ( text.indexOf( "@jsx React.DOM" ) === -1 ) {
    text = "/** @jsx React.DOM */\n" + text;
  }

  try {
    output = mimosaConfig.react.lib.transform( text );
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
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
