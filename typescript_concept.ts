var num: string = 'hjhjkhj';
console.log(num);
class demo
{
    new():void
    {
        var num = greet()
        console.log(num)
    }
}

function greet():string {
    var num = '111'
    return num;
}
function str_func():number{
    var num = 1;
    return num;
}

function employee(id:number,name:string) { 
    this.id = id 
    this.name = name 
 } 
 
 var emp = new employee(123,"Smith") 
 employee.prototype.email = "smith@abc.com" 
 
 console.log("Employee 's Id: "+emp.id) 
 console.log("Employee's name: "+emp.name) 
 console.log("Employee's Email ID: "+emp.email)

var obj = new demo();
obj.new();

