'use strict';

angular.module('mean.dashboard').controller('DashboardController', ['$scope', 'Global', 'Dashboard', '$compile','uiCalendarConfig', '$filter',
  function($scope, Global, Dashboard, $compile,uiCalendarConfig, $filter) {
      $scope.global = Global;
      $scope.package = {
        name: 'dashboard'
      };

      $scope.appointments = [
          { _id: 1, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou'},
          { _id: 2, 'title': 'Dentist Check with Dr. Amadu', 'content': 'Dentist check with Dr. Amadu Dentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. Amadu'},
          { _id: 3, 'title': 'Notification title here', 'content': 'Dentist check with Dr. Amadu Dentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. Amadu'},
          { _id: 4, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. Abou Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou'},
          { _id: 5, 'title': 'Dentist Check with Dr. Amadu', 'content': 'Dentist check with Dr. Amadu'},
          { _id: 6, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. Abou Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou'},
          { _id: 7, 'title': 'Dentist Check with Dr. Amadu', 'content': 'Dentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. Amadu'}
      ];

      $scope.notifications = [
          { _id: 1, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. Abou Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou'},
          { _id: 2, 'title': 'Dentist Check with Dr. Amadu', 'content': 'Dentist check with Dr. Amadu Dentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. Amadu'},
          { _id: 3, 'title': 'Notification title here', 'content': 'Dentist check with Dr. Amadu Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou'},
          { _id: 5, 'title': 'Dentist Check with Dr. Amadu', 'content': 'Dentist check with Dr. Amadu Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou'},
          { _id: 6, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. Abou Eye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. AbouEye Check up with Dr. Abou Eye Check up with Dr. Abou'},
          { _id: 7, 'title': 'Dentist Check with Dr. Amadu', 'content': 'Dentist check with Dr. Amadu Dentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. AmaduDentist check with Dr. Amadu'}
      ];

      $scope.appointment = { _id: 2, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. Abou'};
      $scope.notification = { _id: 3, 'title': 'Eye Check up with Dr. Abou', 'content': 'Eye Check up with Dr. Abou'};

      $scope.selectAppointment = function(id){
          $scope.appointment = $filter('filter')($scope.appointments, {_id: id}, true)[0];
      };

      $scope.selectNotification = function(id){
          $scope.notification = $filter('filter')($scope.notifications, {_id: id}, true)[0];
      };

      $scope.active = 'profile';

      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      $scope.changeTo = 'Hungarian';
      /* event source that pulls from google.com */
      $scope.eventSource = {
          url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
          className: 'gcal-event',           // an option!
          currentTimezone: 'America/Chicago' // an option!
      };
      /* event source that contains custom events on the scope */
      $scope.events = {
          color: '#0078ba',
          textColor: 'white',
          events: [{title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
              {id: 999, title: 'Taking Medicine', start: new Date(y, m, d - 3, 16, 0), allDay: false},
              {id: 999, title: 'Taking Medicine', start: new Date(y, m, d + 4, 16, 0), allDay: false},
              {
                  title: 'Dentist check With Dr Jhon Doe',
                  start: new Date(y, m, d + 1, 19, 0),
                  end: new Date(y, m, d + 1, 22, 30),
                  allDay: false
              },
              {
                  title: 'Eye check with Dr. Amadu',
                  start: new Date(y, m, 28),
                  end: new Date(y, m, 29),
                  url: 'http://coders4africa.com'
              }
          ]
        };

      /* alert on eventClick */
      $scope.alertOnEventClick = function( date, jsEvent, view){
          $scope.alertMessage = (date.title + ' was clicked ');
      };
      /* alert on Drop */
      $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
          $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
      };
      /* alert on Resize */
      $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
          $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
      };
      /* add and removes an event source of choice */
      $scope.addRemoveEventSource = function(sources,source) {
          var canAdd = 0;
          angular.forEach(sources,function(value, key){
              if(sources[key] === source){
                  sources.splice(key,1);
                  canAdd = 1;
              }
          });
          if(canAdd === 0){
              sources.push(source);
          }
      };
      /* add custom event*/
      $scope.addEvent = function() {
          $scope.events.push({
              title: 'Open Sesame',
              start: new Date(y, m, 28),
              end: new Date(y, m, 29),
              className: ['openSesame']
          });
      };
      /* remove event */
      $scope.remove = function(index) {
          $scope.events.splice(index,1);
      };
      /* Change View */
      $scope.changeView = function(view,calendar) {
          uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };
      /* Change View */
      $scope.renderCalender = function(calendar) {
          if(uiCalendarConfig.calendars[calendar]){
              uiCalendarConfig.calendars[calendar].fullCalendar('render');
          }
      };
      /* Render Tooltip */
      $scope.eventRender = function( event, element, view ) {
          element.attr({'tooltip': event.title,
              'tooltip-append-to-body': true});
          $compile(element)($scope);
      };
      /* config object */
      $scope.uiConfig = {
          calendar:{
              height: 450,
              editable: true,
              header:{
                  left: 'title',
                  center: 'month agendaWeek',
                  right: 'today prev,next'
              },
              eventClick: $scope.alertOnEventClick,
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize,
              eventRender: $scope.eventRender
          }
      };

      /* event sources array*/
      $scope.eventSources = [$scope.events];

  }
]);
