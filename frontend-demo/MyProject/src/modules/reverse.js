var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Generic reverse function
function reverse(input) {
    if (Array.isArray(input)) {
        return __spreadArray([], input, true).reverse();
    }
    else if (typeof input === "string") {
        return input.split("").reverse().join("");
    }
    else {
        throw new Error("Input must be an array or string");
    }
}
// Helper function: returns array of first n square numbers
var square = function (n) {
    var result = [];
    for (var i = 1; i <= n; i++)
        result.push(i * i);
    return result;
};
console.log("int arr reverse..", reverse([1, 2, 3, 4]));
console.log("string reverse...", reverse("shri"));
console.log("fn result reverse...", reverse(__spreadArray([], square(10), true)));
var num = 57;
var reversedNum = reverse(num + "");
console.log("reverse of a number...", Number(reversedNum));
