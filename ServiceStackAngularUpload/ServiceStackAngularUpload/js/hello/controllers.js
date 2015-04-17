var app = angular.module('helloApp.controllers', []);

app.controller('helloCtrl', ['$scope', '$http', 'fileUpload',
        function ($scope, $http, fileUpload) {
            $scope.$watch('name', function () {
                if ($scope.name) {
                    $http.get('/hello/' + $scope.name)
                        .success(function (response) {
                            $scope.helloResult = response.Result;
                        });
                }
            });

            $scope.testFunction = function() {
                return true;
            }

            $scope.uploadFile = function () {
                var file = $scope.myFile;
                console.log('file is ' + JSON.stringify(file));
                var uploadUrl = "/myfileupload?FirstName=Test&LastName=McTest";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            };
        }
]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function () {
        })
        .error(function () {
        });
    }
}]);