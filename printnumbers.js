var args = process.argv

function add(a, b) {
    return a + b;
}

function asNum(a) {
    return +a
}

var sum = args.slice(2, args.length).map(asNum).reduce(add, 0)
console.log(sum)
