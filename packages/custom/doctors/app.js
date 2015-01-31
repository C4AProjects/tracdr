'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Doctors = new Module('doctors');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Doctors.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Doctors.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Doctors.menus.add({
    title: 'doctors example page',
    link: 'doctors example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Doctors.aggregateAsset('css', 'doctors.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Doctors.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Doctors.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Doctors.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Doctors;
});
