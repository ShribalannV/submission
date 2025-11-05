// function block(){
//     function foo(){
//         console.log(x);
//     }
//     foo();//reference error
//     let x=3;
//     foo();
// }
 
//using var
let vals=[];
for(var x=0; x<4 ; x+=1){
    vals.push(()=>x);
}
// console.log(vals.map(x=>x));
console.log("using var:- "+vals.map(fn => fn()));
 
//using let
let vals1 = [];
for (let x = 0; x < 4; x++) {
    vals1.push(() => x);
}
 
console.log("using let:- "+ vals1.map(fn => fn())); 
 
// //const variables - standard javascript
 
const obj={par:3};
// obj=4; typerror
 
obj.par=12;
 
Object.freeze(obj);
obj.par=10;
 
 
// //const variables - standard functions
function ParaFreeze(obj){
     Object.freeze(obj);
     obj.par=10;
}
const inputobj={par:3};
ParaFreeze(inputobj);
console.log(inputobj.par);
 
 
//shorthand assignment
 
let x3=3;
let y4=5;
let xo={x3,y4};
console.log(xo)
 
//shorthand assignment using loops
short_hand=[];
for (let x=0;x<=17;x+=1){
   let x5=(x+1);
   let y5=2*x5;
   let xx0={x5,y5};
   short_hand.push(xx0)
}
console.log(short_hand);
 
//new syntax
let foo={
    toString(){
        super.toString()+'with foo';
    }
};
 
//symbols
 
let s1=Symbol('test');
let s2=Symbol('test');
console.log(s1==s2);
 
//symbol primitive
 
// const js_obj= {
//     name:"Sriram",age:"60",
//     [Symbol.toPrimitive](hint){
//         if(hint=="string") return "Hint: Guess over 50";
//         if(hint=="number") return "return 58";  
//         if(hint=="default") return "somewhere between 50 and 60";
//     }
// }
 
// const js_obj= {
//     name:"Sriram",age:"60",
//     [Symbol.toPrimitive](hint){
//         if(hint=="string") return "Hint: Guess over 50";
//         if(hint=="number") return "return 58";  
//         if(hint=="default") return "somewhere between 50 and 60";
//     }
// }
const js_obj = {
    name: "Sriram", age: 60, salary: 600,
    [Symbol.toPrimitive](hint) {
        if (hint === "string") return "Hint: Guess over 50";
        if (hint === "number") return Number(this.salary);
        return JSON.stringify(this);   // default
    }
}
 
console.log(js_obj);          // prints object normally
console.log(String(js_obj));  // capital S → triggers "string" hint
 
//class and parameter
class Jedi{
    constructor(){
        this.forceIsDark = false;
    }
    toString(){
        return(this.forceIsDark?'Join':'fear')+
        'the dark side';
    }
}
 
const luke = new Jedi();     // create object
console.log(luke.toString()); // call the method


//class and parameter
 
// Base Character Class
class Character {
    constructor(name, power, side) {
        this.name = name;
        this.power = power;
        this.side = side;
    }
 
    toString() {
        return `${this.name} belongs to ${this.side} with power: ${this.power}`;
    }
}
//EXTENDING THE CLASS
// Hero Class
class Hero extends Character {
    constructor(name, power) {
        super(name, power, "Avengers"); // sending custom side to base class
    }
 
    toString() {
        return `${this.name} is a Hero of the ${this.side} with power: ${this.power}`;
    }
}
 
// Villain Class
class Villain extends Character {
    constructor(name, power) {
        super(name, power, "Villains of the Avengers");
    }
 
    toString() {
        return `${this.name} is a Villain from the ${this.side} with power: ${this.power}`;
    }
}
 
// Creating Avengers & Villains
const ironMan = new Hero("Iron Man", "Genius & Armor Suit");
const thor = new Hero("Thor", "Thunder God");
const thanos = new Villain("Thanos", "Infinity Gauntlet");
const loki = new Villain("Loki", "Magic & Trickery");
 
// Output
console.log(ironMan.toString());
console.log(thor.toString());
console.log(thanos.toString());
console.log(loki.toString());


for(let i of ['a','b','c']){
   
    console.log(i);
   
}

function gen(n)
{
    return {
        [Symbol.iterator](){
            let i = 0;
            return {
                next(){
                    return{
                        done:(i>=n),true:false,
                        value : i++
                    };
                }
            };
        }
    };
}

let m = new Map([['a',1],['b',2],['c',3]]);
console.log(m);
JSON.stringify(m); // '{}'

function*genFour()
{
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
let genObj = genFour();