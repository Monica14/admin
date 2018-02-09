var num = 'hjhjkhj';
console.log(num);
var demo = (function () {
    function demo() {
    }
    demo.prototype.new = function () {
        var num = greet();
        console.log(num);
    };
    return demo;
})();
function greet() {
    var num = '111';
    return num;
}
function str_func() {
    var num = 1;
    return num;
}
function employee(id, name) {
    this.id = id;
    this.name = name;
}
var emp = new employee(123, "Smith");
employee.prototype.email = "smith@abc.com";
console.log("Employee 's Id: " + emp.id);
console.log("Employee's name: " + emp.name);
console.log("Employee's Email ID: " + emp.email);
var obj = new demo();
obj.new();
