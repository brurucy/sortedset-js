"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FenwickArray = void 0;
const utils_1 = require("../utils/utils");
function simpleProbe(item) {
    return item;
}
class FenwickArray {
    constructor(arr, probe) {
        const length = arr.length;
        this.innerStructure = new Array(length);
        probe = probe || simpleProbe;
        this.innerStructure[0] = probe(arr[0]);
        for (let i = 1; i < length; i++) {
            this.innerStructure[i] = this.innerStructure[i - 1] + probe(arr[i]);
        }
        for (let i = length - 1; i > 0; i--) {
            const lowerBound = (i & (i + 1)) - 1;
            if (lowerBound >= 0) {
                this.innerStructure[i] -= this.innerStructure[lowerBound];
            }
        }
    }
    prefixSum(index) {
        if (index > this.innerStructure.length) {
            return undefined;
        }
        let sum = 0;
        while (index > 0)
            (sum += this.innerStructure[index - 1]), (index &= index - 1);
        return sum;
    }
    increaseLength(index) {
        const length = this.innerStructure.length;
        while (index < length)
            (this.innerStructure[index] += 1), (index |= index + 1);
    }
    decreaseLength(index) {
        const length = this.innerStructure.length;
        while (index < length)
            (this.innerStructure[index] -= 1), (index |= index + 1);
    }
    indexOf(prefixSum) {
        const length = this.innerStructure.length;
        let ans = 0, x = (0, utils_1.mostSignificantBit)(length) * 2;
        while (x && x === (x | 0)) {
            const lsb = (0, utils_1.leastSignificantBit)(x);
            if (x <= length && this.innerStructure[x - 1] <= prefixSum) {
                prefixSum -= this.innerStructure[x - 1];
                ans = x;
                x += lsb / 2;
            }
            else {
                x += lsb / 2 - lsb;
            }
        }
        return ans;
    }
}
exports.FenwickArray = FenwickArray;
//# sourceMappingURL=fenwick_array.js.map