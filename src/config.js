"use strict";

exports.defaults = function() {
  return {
    react: {
      extensions: ["jsx"],
      options: {
        harmony: false
      },
      sourceMapDynamic: true
    }
  };
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

    if ( validators.ifExistsIsObject( errors, "react.options", config.react.options ) ) {
      validators.ifExistsIsBoolean( errors, "react.options.harmony", config.react.options.harmony );
    }
  }

  if ( !config.isBuild ) {
    config.react.options = config.react.options || {};
    if (config.react.options.sourceMap !== false) {
      config.react.options.sourceMap = true;
    }
  }

  return errors;
};
