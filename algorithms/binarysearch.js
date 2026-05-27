function binarySearch(arr, target) {
  // Array must be sorted alphabetically before calling this
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = arr[mid].name.toLowerCase();
    const targetVal = target.toLowerCase();

    if (midVal === targetVal) {
      // Found exact match
      return arr[mid];
    } else if (midVal < targetVal) {
      // Target is in right half
      left = mid + 1;
    } else {
      // Target is in left half
      right = mid - 1;
    }
  }

  // Not found
  return null;
}

module.exports = binarySearch;