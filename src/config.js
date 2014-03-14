"use strict";

exports.defaults = function() {
  return {
    react: {
      extensions: ["jsx"]
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  react:                     # config settings for the react compiler module\n" +
         "    lib: undefined           # use this property to provide a specific version of react-tools\n" +
         "    extensions: [\"jsx\"]  # default extensions for React/JSX files\n";
};

exports.validate = function(config, validators) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "react config", config.react ) ) {

    if ( !config.react.lib ) {
      config.react.lib = require( "react-tools" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "react.extensions", config.react.extensions ) ) {
      if (config.react.extensions.length === 0) {
        errors.push( "react.extensions cannot be an empty array");
      }
    }

  }

  return errors;
};
