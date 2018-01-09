var app = angular.module('pms', ["ngRoute", "datatables", "ngFileUpload"]);

///////////////////// Routing ////////////////////////////
app.config(function ($routeProvider) {
    $routeProvider
        .when("/add_menu", {
            templateUrl: "./form.html"
        })
        .when("/admin_dashboard", {
            templateUrl: "./admin_dashboard.html"
        })
        .when("/search_user", {
            templateUrl: "./user_list.html"
        })
        .when("/broadcast", {
            templateUrl : "broadcast.html"
        })
        .when("/service_example", {
            templateUrl : "service_example.html"
        })
        .when("/directives", {
            templateUrl : "directives.html"
        })
        .when("/filter_example", {
            templateUrl : "filter_example.html"
        })
        .when("/node_events", {
            templateUrl : "nodeevents.html"
        })
        .when("/node_promise", {
            templateUrl : "node_promise.html"
        })
        .when("/node_concept", {
            templateUrl : "node_concept.html"
        })
        .when("/node_callback", {
            templateUrl : "node_callback.html"
        })
        .when("/node_jwt", {
            templateUrl : "jwt_example.html"
        })
        .when("/node_pipe", {
            templateUrl : "node_pipe.html"
        })
        .when("/createserver", {
            templateUrl : "createserver.html"
        });
});
app.controller('serv', function ($scope, $http, $rootScope, Upload, addition) {
    $scope.$on('getname', function (events, args) {
        console.log(events);
        console.log(args);
        $scope.emp_name = args;
    })
});
app.service('addition', function () {
    this.myfunc1 = function (x) {
        console.log(x);
    }
});
app.controller('myfunc', function ($scope, $http, $rootScope, Upload, addition) {
    $scope.get_val = function () {
        $rootScope.$broadcast('getname', $scope.emp_name);
    }
    $scope.generate_taken = function ()
    {
        userdata = {
            user : $scope.jwt_token
        }
        //alert($scope.jwt_token);
        $http.post('http://localhost:3016/jwt/generate_token',userdata).then(function(res){
            console.log("Go ahead");
        })
    }
    $scope.verify = function()
    {
        $http.get('http://localhost:3016/jwt/verify_token').then(function(res){
            console.log(res);
        })
    }
    addition.myfunc1(16);
    $scope.click1 = function () {
        data = {
            emp_name: $scope.emp_name,
            proj_name: $scope.proj_name,
            proj_start_date: $scope.proj_start_date,
            proj_end_date: $scope.proj_end_date,
            file: this.emp_pan
        };
        //console.log(this.emp_pan);
        Upload.upload({ url: "http://localhost:3016/details/send", data: data }).then(function (res) {
            // for(var i=0;i<res.data.length;i++)
            // {
            //     console.log(res.data[i]['msg']);
            //     break;
            // }  
            console.log("sadsadas")
        })
    }
});
app.filter('custfilter', function () {
    return function (item) {
        return item.toUpperCase();
    }
});

///////////////////////// Datatables in angularjs ////////////////////

app.controller('user_list', function ($scope, $http, DTOptionsBuilder) {

    // DataTables configurable options
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(2)
        .withOption('bLengthChange', false);
    $http.get('http://localhost:3016/details/user_list').then(function (res) {
        //console.log(res.data.length)
        $scope.user_list = res.data
    })
});

///////////////////////////// Broadcast vs emit //////////////////////////////////
app.controller("MyController1", function ($scope, $rootScope) {

    //broadcast the event down
    $scope.OnClick = function () {
        $scope.$broadcast("SendDown", "some data");
    }

    //handle SendDown event
    $scope.$on("SendDown", function (evt, data) {
        $scope.Message = "Inside SendDown handler of MyController1 : " + data;
    });

    //handle SendUp event
    $scope.$on("SendUp", function (evt, data) {
        $scope.Message = "Inside SendUp handler  of MyController1 : " + data;
    });
});

app.controller("MyController2", function ($scope, $rootScope) {

    //handle SendDown event
    $scope.$on("SendDown", function (evt, data) {
        $scope.Message = "Inside SendDown handler of MyController2 : " + data;
    });

    //handle SendUp event
    $scope.$on("SendUp", function (evt, data) {
        $scope.Message = "Inside SendUp handler of MyController2 : " + data;
    });

});

app.controller("MyController3", function ($scope, $rootScope) {

    //handle SendDown event
    $scope.$on("SendDown", function (evt, data) {
        $scope.Message = "Inside SendDown handler of  MyController3 : " + data;
    });

    //emit SendUp event up
    $scope.OnClick = function () {
        $scope.$emit("SendUp", "some data");
    }

    //handle SendUp event
    $scope.$on("SendUp", function (evt, data) {
        $scope.Message = "Inside SendUp handler of MyController3: " + data;
    });
});

////////////////////////// service example ////////////////////////
app.service('getdata',function($rootScope){
    this.cust_func = function(name,id)
    {
        $rootScope.$broadcast('pname',{a:name,b:id})
    }    
})  
app.controller('serv_example',function($scope,getdata,$rootScope){ 
    $scope.show_div1 = false;   
    $scope.call_serv = function(name,id)
    {
        getdata.cust_func(name,id)
        $scope.show_div1 = true;
    }  
    $rootScope.$on('pname',function(event,arg){
        $scope.name = arg.a;
        $scope.id = arg.b;
        console.log(arg)
    })
})

/////////////////////// ng-repeat ///////////////////
app.controller('directive',function($scope){
    $scope.count = 0;
    $scope.records = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ]
})