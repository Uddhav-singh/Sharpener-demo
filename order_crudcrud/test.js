let name1 = {
    fName : "abc",
    lName : "xyz",
    printFullName : function (){
        console.log(this.fName+" "+this.lName)
    }
}

name1.printFullName();

let name2 =  {
    fName : "Tuviksh",
    lName : "singh",
    
}
name1.printFullName.call(name2)

let newFulName = function(hometown, state){
    console.log(this.fName+" "+this.lName+" "+hometown+" "+state )
}

let newName = newFulName.bind(name2, "Mumbai", "Maharashtra");
console.log(newName);
newName();