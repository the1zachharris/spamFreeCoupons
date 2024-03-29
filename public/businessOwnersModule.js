'use strict';
var businessOwners = angular.module('businessOwners',[
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.exporter',
    'ui.grid.resizeColumns',
    'ui.grid.cellNav',
    'ui.grid.autoResize',
    'ngAnimate',
    'ngLodash',
    'ngMaterial',
    'ngMaterialDatePicker',
    'ui.bootstrap',
    'gm.typeaheadDropdown',
    'angular-clipboard',
    'ngRoute',
    'oc.lazyLoad',
    'ngToast'
]);

businessOwners.config([
        '$routeProvider',
        function (
            $routeProvider
        ) {
            $routeProvider
                /*.when('/createAccount',{
                    name: 'businessOwners create',
                    templateUrl:'modules/businessOwners/views/createOwner.client.view.html',
                    label: 'businessOwners create',
                    controller: 'businessOwnersController',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'businessOwnersController',
                                files:[
                                    // Controllers
                                    'modules/businessOwners/controllers/businessOwners.client.controller.js'
                                ]
                            });
                        }]
                    }
                })
                .when('/createAccount/business/:id',{
                    name: 'businessOwners create',
                    templateUrl:'modules/businessOwners/views/createOwnerClaim.client.view.html',
                    label: 'businessOwners create',
                    controller: 'businessOwnersController',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'businessOwnersController',
                                files:[
                                    // Controllers
                                    'modules/businessOwners/controllers/businessOwners.client.controller.js'
                                ]
                            });
                        }]
                    }
                })
                .when('/',{
                    name: 'businessOwners signIn',
                    templateUrl:'modules/businessOwners/views/signIn.client.view.html',
                    label: 'businessOwners signIn',
                    controller: 'businessOwnersController',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'businessOwnersController',
                                files:[
                                    // Controllers
                                    'modules/businessOwners/controllers/businessOwners.client.controller.js'
                                ]
                            });
                        }]
                    }

                })
                .when('/signIn',{
                    name: 'businessOwners signIn',
                    templateUrl:'modules/businessOwners/views/signIn.client.view.html',
                    label: 'businessOwners signIn',
                    controller: 'businessOwnersController',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'businessOwnersController',
                                files:[
                                    // Controllers
                                    'modules/businessOwners/controllers/businessOwners.client.controller.js'
                                ]
                            });
                        }]
                    }
                })
                .when('/signIn/business/:id',{
                    name: 'businessOwners signInClaim',
                    templateUrl:'modules/businessOwners/views/signInClaim.client.view.html',
                    label: 'businessOwners signInClaim',
                    controller: 'businessOwnersController',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'businessOwnersController',
                                files:[
                                    // Controllers
                                    'modules/businessOwners/controllers/businessOwners.client.controller.js'
                                ]
                            });
                        }]
                    }
                })*/
        }
    ]
);

businessOwners.factory('businessOwnerCalls', function($http, $routeParams) {
    console.log("in businessOwnerCalls factory");
    //var env = 'http://localhost:3000';
    var businessOwnersMasterService = {
        detailBusinessOwner: function(req){
            var promise = $http({
                method: 'GET',
                url: '/businessOwner/detail/' + req.id
            }).then(function (response) {
                return response;
            });
            return promise;
        },
        getBusinessOwners: function(req){
            var promise = $http({
                method: 'GET',
                url: '/businessOwner/list',
                params: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        getBusinesses: function(req){
            var promise = $http({
                method: 'GET',
                url: '/business/list',
                params: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        newBusiness: function(req){
            var promise = $http({
                method: 'POST',
                url: '/business/create',
                data: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        searchBusinesses: function(req){
            var promise = $http({
                method: 'POST',
                url: '/business/search',
                data: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        updateBusiness: function(req){
            var promise = $http({
                method: 'POST',
                url: '/business/update',
                data: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        newBusinessOwner: function(req){
            var promise = $http({
                method: 'POST',
                url: '/businessOwner/create',
                data: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        updateBusinessOwner: function(req){
            var promise = $http({
                method: 'POST',
                url: '/businessOwner/update',
                data: req
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        },
        deleteBusinessOwner: function(req){
            var promise = $http({
                method: 'DELETE',
                url: '/businessOwner/delete/' + req.id
            }).then(function (response) {
                return response;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return businessOwnersMasterService;
});

/*
// Get application settings from Mongo
businessOwners.factory('businessOwnersSettings', [
    '$http',
    'methodCop',
    function(
        $http,
        methodCop
    ) {
        return {
            get : function () {
                return $http({
                    method: 'GET',
                    url: '/applications/settings/businessOwners'
                })
                    .then(
                        function (resp) {
                            if (methodCop.check([resp.data])) {
                                var settings = {
                                    name : resp.data.app[0].name // get name of app
                                };
                                angular.forEach(resp.data.app[0].settings, function (setting) {
                                    settings[setting.name] = setting.value; // get the settings for the app
                                });
                                return settings;
                            }
                        },
                        function (err) {
                            console.error('There was an error when trying to get businessOwners settings: ' + err);
                            return err;
                        }
                    );
            }
        }
    }
]);
*/
