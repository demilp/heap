function Heap(isMin) {
  let list = [-1];
  this.insert = (value) => {
    list.push(value);
    let currI = length() - 1;
    let parentI = parentIndex(currI);
    while (compare(list[currI], list[parentI])) {
      swapIndexes(currI, parentI);
      currI = parentI;
      parentI = parentIndex(currI);
    }
  };
  this.remove = () => {
    if (list.length === 1) return null;
    let value = list[1];
    list[1] = list[length() - 1];
    list.length--;
    let currI = 1;
    let leftI = leftIndex(currI);
    let rightI = rightIndex(currI);
    let currVal = list[currI];
    let leftVal = list[leftI] || null;
    let rightVal = list[rightI] || null;
    while (
      (leftVal !== null && compare(leftVal, currVal)) ||
      (rightVal !== null && compare(rightVal, currVal))
    ) {
      if (rightVal === null || compare(leftVal, rightVal)) {
        swapIndexes(currI, leftI);
        currI = leftI;
      } else {
        swapIndexes(currI, rightI);
        currI = rightI;
      }
      leftI = leftIndex(currI);
      rightI = rightIndex(currI);
      currVal = list[currI];
      leftVal = list[leftI];
      rightVal = list[rightI];
    }
    return value;
  };
  let length = () => {
    return list.length;
  };
  let parentIndex = (index) => {
    return Math.max(1, Math.floor(index / 2));
  };
  let leftIndex = (index) => {
    return index * 2;
  };
  let rightIndex = (index) => {
    return index * 2 + 1;
  };
  let swapIndexes = (i, j) => {
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  };
  this.size = () => {
    return list.length - 1;
  };
  let compare = (val1, val2) => {
    if (isMin) {
      return val1 < val2;
    }
    return val1 > val2;
  };
}

function MaxHeap() {
  return new Heap(false);
}
function MinHeap() {
  return new Heap(true);
}

module.exports = { MinHeap, MaxHeap };

/* let heap = new MinHeap();
heap.insert(5);
heap.insert(2);
heap.insert(3);
heap.insert(7);
heap.insert(1);
heap.insert(5);
heap.insert(1);
heap.insert(4);
while (heap.size() > 0) {
  console.log(heap.remove());
} */
