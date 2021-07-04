function quicksort(left, right, arr) {
    if (left >= right) return
    const base = arr[left]
    let l = left
    let r = right
    while(l != r) {
        while(l < r && arr[r] >= base) {
            r --
        }
        while(l < r && arr[l] <= base) {
            l ++
        }
        [arr[l], arr[r]] = [arr[r], arr[l]]
    }
    [arr[l], arr[left]] = [arr[left], arr[l]]
    quicksort(left, l - 1, arr)
    quicksort(l+1, right, arr)
}

var arr = [4,3,1,2,5]
quicksort(0, arr.length-1, arr)
console.log(arr)

1
2 3
45 67 (n)

logn