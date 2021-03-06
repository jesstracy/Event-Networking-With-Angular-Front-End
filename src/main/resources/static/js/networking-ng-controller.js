angular.module('NetworkingAngularApp', [])
   .controller('SampleController', function($scope, $http, $timeout) {
        $scope.register = function(email, firstName, lastName, password, techSkills) {
            console.log("In register function in ng controller");

            //Make a container
            var newUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                techSkills: techSkills
            }
            console.log("Container we're about to send: " + newUser.email + " " + newUser.firstName + " " + newUser.lastName + " " + newUser.password + " " + newUser.techSkills);

            $http.post("/register.json", newUser)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.loginContainer = response.data;
                        $scope.userWhoIsLoggedIn = $scope.loginContainer.user;
                        console.log("User who is logged in: " + $scope.userWhoIsLoggedIn.firstName + ", id: " + $scope.userWhoIsLoggedIn.id);
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.login = function(loginEmail, loginPassword) {
            console.log("In login function in ng controller");

            //Make a container
            var returningUser = {
                email: loginEmail,
                password: loginPassword
            }

            $http.post("/login.json", returningUser)
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.loginContainer = response.data;
                        $scope.userWhoIsLoggedIn = $scope.loginContainer.user;
                        console.log("User who is logged in: " + $scope.userWhoIsLoggedIn.firstName + ", id: " + $scope.userWhoIsLoggedIn.id);
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.getAllEvents = function() {
            console.log("In getAllEvents function in ng controller");

            $http.post("/getAllEvents.json")
                .then(
                    function successCallback(response) {
                        console.log(response.data);
                        console.log("Adding data to scope");
                        $scope.listOfEvents = response.data;
                    },
                    function errorCallback(response) {
                        console.log("Unable to get data...");
                    });
        };

        $scope.createNewEvent = function(newEventName, newEventLocation, newEventDate, newEventTime) {
             console.log("In createNewEvent function in ng controller");

             //Make a container
             var newEvent = {
                 name: newEventName,
                 location: newEventLocation,
                 date: newEventDate,
                 time: newEventTime
             }

             $http.post("/addEvent.json", newEvent)
                 .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         $scope.listOfEvents = response.data;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
         };

        $scope.seeAttendees = function(eventIWantToJoin) {
             console.log("In seeAttendees function in ng controller");

             $http.post("/seeAttendeesForEvent.json", eventIWantToJoin.id)
                  .then(
                     function successCallback(response) {
//                         console.log("**Response data from seeAttendees: " + response.data);
                         console.log(response.data);
                         console.log("Adding data to scope");
                         // Returns a list of attendees
                         $scope.eventAttendees = response.data;
                         $scope.showAttendees = true;
                         $scope.currentEvent = eventIWantToJoin;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.joinEvent = function(myUserId, eventIWantToJoinId) {
             console.log("In joinEvent function in ng controller");

             //Make a container
             var newUserEvent = {
                  userId: myUserId,
                  eventId: eventIWantToJoinId
             }

             $http.post("/joinEvent.json", newUserEvent)
                  .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         // Returns a list of attendees
                         $scope.eventAttendees = response.data;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.showEmail = function(paramTargetUser) {
             console.log("In showEmail function in ng controller");

             //Make a container
             var showEmailContainer = {
                  userId: paramTargetUser.id,
                  userWhoWantsToBeFriendId: $scope.userWhoIsLoggedIn.id
             }

             $scope.targetUser = paramTargetUser;

             console.log("About to send to /viewUserInfo.json -> userId: " + showEmailContainer.userId + ", paramTargetUser.id: " + showEmailContainer.userWhoWantsToBeFriendId);

             $http.post("/viewUserInfo.json", showEmailContainer)
                  .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         $scope.userInfoContainer = response.data;
                         $scope.contactRequested = true;
//                         if ($scope.userInfoContainer.user != null) {
//                            $scope.targetUser = $scope.userInfoContainer.user;
//                            console.log("***setting target user now");
//                         }

                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.requestToBeFriends = function() {
                     console.log("In requestToBeFriends function in ng controller");

                     //Make a container
                     var requestToBeFriendsContainer = {
                          userId: $scope.targetUser.id,
                          userWhoWantsToBeFriendId: $scope.userWhoIsLoggedIn.id
                     }

//                     console.log("About to send to /viewUserInfo.json -> userId: " + showEmailContainer.userId + ", targetUserId: " + showEmailContainer.userWhoWantsToBeFriendId);

                     $http.post("/requestContact.json", requestToBeFriendsContainer)
                          .then(
                             function successCallback(response) {
                                 console.log(response.data);
                                 console.log("Adding data to scope");
                                 $scope.requestToBeFriendsContainerResponse = response.data;

                             },
                             function errorCallback(response) {
                                 console.log("Unable to get data...");
                             });
                };

//        $scope.viewUserInfo = function(requesterUserId, requesteeUserId) {
//             console.log("In viewUserInfo function in ng controller");
//
//             //Make a container
//             var idContainer = {
//                  userId: requesterUserId,
//                  friendId: requesteeUserId
//             }
//
//             $http.post("/viewUserInfo.json", idContainer)
//                  .then(
//                     function successCallback(response) {
//                         console.log(response.data);
//                         console.log("Adding data to scope");
//                         // Returns container with error or user
//                         $scope.friendContainer = response.data;
//                     },
//                     function errorCallback(response) {
//                         console.log("Unable to get data...");
//                     });
//        };

        $scope.addToMyFriendList = function (myUserIdAllow, friendUserIdAllow) {
             console.log("In addToMyFriendList function in ng controller");

             //Make a container
             var idFriendContainer = {
                  userId: myUserIdAllow,
                  userWhoWantsToBeFriendId: friendUserIdAllow
             }

             $http.post("/addToMyFriendList.json", idFriendContainer)
                  .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         // Returns container with error or user
                         $scope.addToMyFriendListUser = response.data;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.checkIfIHaveAccess = function(myUserIdCheck, theirUserIdCheck) {
             console.log("In checkIfIHaveAccess function in ng controller");

             //Make a container
             var doIHaveAccessContainer = {
                  userId: theirUserIdCheck,
                  userWhoWantsToBeFriendId: myUserIdCheck
             }

             $http.post("/viewUserInfo.json", doIHaveAccessContainer)
                  .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         // Returns container with error or user
                         $scope.doIHaveAccessResponse = response.data;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.requestContact = function(myUserIdRequestContact, theirUserIdRequestContact) {
             console.log("In requestContact function in ng controller");

             //Make a container
             var requestContactContainer = {
                  userId: theirUserIdRequestContact,
                  userWhoWantsToBeFriendId: myUserIdRequestContact
             }

             $http.post("/requestContact.json", requestContactContainer)
                  .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         $scope.requestContactResponse = response.data;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.acceptRequest = function(requestUser) {
             console.log("In acceptRequest function in ng controller");

             //Make a container
             var acceptRequestContainer = {
                  userId: $scope.userWhoIsLoggedIn.id,
                  userWhoWantsToBeFriendId: requestUser.id
             }

             $http.post("/addToMyFriendList.json", acceptRequestContainer)
                  .then(
                     function successCallback(response) {
                         console.log(response.data);
                         console.log("Adding data to scope");
                         $scope.myListOfFriends = response.data;
                     },
                     function errorCallback(response) {
                         console.log("Unable to get data...");
                     });
        };

        $scope.userWhoIsLoggedIn;
        $scope.showAttendees = false;
        $scope.currentEvent;
        $scope.contactRequested = false;
        $scope.targetUser;
        console.log("Page loaded!");

    });