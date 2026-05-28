function mergeSort(arr, compareFn) {
  // Base case - if array has 1 or 0 elements it is already sorted
  if (arr.length <= 1) return arr;

  // Split array in half
  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);

  return merge(left, right, compareFn);
}

function merge(left, right, compareFn) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

module.exports = mergeSort;