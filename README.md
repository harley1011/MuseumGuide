#Build Status LM-MainNode CI
![build status](http://prive.myds.me:3000/harley1011/museumguide/badge?branche=master)

# Getting Started

There are a few ways you can run this application from the command line.
The commands:
"ionic serve" will launch a local web server where you will see the application inside a browser
"ionic run android" will launch the application on either an android emulator or your android device if it is plugged in and developer mode is enabled. Note that you will need the Android SDK to run this command
"ionic run ios" will launch the application on an iOS simulator, you must have xCode to be able to run this command

# Project Structure
The project uses AngularJS so the three main components will be directives, controllers, and services

To create a controller create a new javascript file in the controllers folder.
Add the following code below and replace AppCtrl with the name of the controller.

angular.module('controllers')
    .controller('AppCtrl', function($scope) {

    })

You can then start adding functionality to your controller.

The same process is used for creating directives and services.

The command "gulp default" will append all these files in the folders controllers, directives, and services to one file for each folder.
