/**
 * Created by kalko on 20.02.17.
 */
var main = angular.module('employee', []);
main.controller('MainController', ['$scope', '$rootScope', '$http', function (scope, rootScope, http) {

    var vm = scope;
    vm.showMode = 0;
    vm.newMan = {};
    vm.employees = [];
    vm.jobs = [
        {
            value: 0,
            name: "CEO"
        },
        {
            value: 1,
            name: "Business Analyst"
        },
        {
            value: 2,
            name: "Developer"
        },
        {
            value: 3,
            name: "QA"
        }
    ];

    http.post('/load').then(function (data) {
       data.data.forEach(function (item) {
           var newMan = {};
           newMan.id = item._id;
           newMan.lName = item.body.lName;
           newMan.fName = item.body.fName;
           newMan.job = item.body.job;
           newMan.rate = item.body.rate;
           newMan.stringDate = item.body.stringDate;
           vm.employees.push(newMan);
       });
    });


    vm.saveFunction = function() {
        if (!vm.newMan.lName || !vm.newMan.fName || !vm.newMan.job || !vm.newMan.rate || !vm.newMan.date){
            alert("Fill all field, pls!");
            return;
        }
        vm.newMan.stringDate = vm.newMan.date.toString();
       http.post('/saveData', {body: vm.newMan}).then(function (data) {
           if (data.status == 200) {
               vm.employees.push(vm.newMan);
               vm.newMan = {};
               alert("Employee saved success");
           } else {
               alert("Employee saved ERROR!");
           }

       });
    };

    vm.addNewEmployee = function () {
        vm.showMode = 1;
        vm.newMan = {};
    };

    vm.deleteFunction = function (id, lName, fName) {
        if (!confirm("You want to delete user " + lName + " " + fName + "\n" + "\n" + "Are you sure?")) return;
        http.post("/delete", {id: id})
            .then(function(data){
                if (data.status == 200) {
                alert("Employee deleted success");
                    vm.employees = vm.employees.filter(function(man){
                        return man.id != id;
                    })
                } else {
                    alert("Employee deleted ERROR!");
                }
            })

    };

    vm.backFunction = function () {
        vm.showMode = 0;
    }

}]);