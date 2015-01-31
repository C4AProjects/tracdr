'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Patients = new Module('patients');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Patients.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Patients.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Patients.menus.add({
    title: 'patients example page',
    link: 'patients example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Patients.aggregateAsset('css', 'patients.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Patients.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Patients.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Patients.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Patients;
});
