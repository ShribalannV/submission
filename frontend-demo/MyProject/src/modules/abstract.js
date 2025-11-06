var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Abstract class: defines a template or base structure
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    // Concrete method — common to all animals
    Animal.prototype.move = function () {
        console.log("".concat(this.name, " is moving..."));
    };
    return Animal;
}());
// Concrete class: provides actual implementation
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log("".concat(this.name, " says: Woof! \uD83D\uDC36"));
    };
    return Dog;
}(Animal));
// Using the concrete class
var myDog = new Dog("Buddy");
myDog.makeSound(); // Output: Buddy says: Woof! 
myDog.move(); // Output: Buddy is moving...
