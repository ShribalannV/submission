// Abstract class: defines a template or base structure
abstract class Animal {
    constructor(public name: string) {}

    // Abstract method — must be implemented by subclasses
    abstract makeSound(): void;

    // Concrete method — common to all animals
    move(): void {
        console.log(`${this.name} is moving...`);
    }
}

// Concrete class: provides actual implementation
class Dog extends Animal {
    makeSound(): void {
        console.log(`${this.name} says: Woof! `);
    }
}

// Using the concrete class
const myDog = new Dog("Buddy");
myDog.makeSound();  // Output: Buddy says: Woof! 
myDog.move();       // Output: Buddy is moving...
