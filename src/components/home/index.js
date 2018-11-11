
let arrNum = [];

(() => {
    let num = 0;
    let result;
    arrNum = Array.from({ length: 1000 }, () => {
        result = num.toString().padStart(3, "00");
        num++;
        return result;
    });

})()
// Math.round(x)
function MathR(number) {
    return Math.round(Math.random() * number)
}
export function makeDadi(num) {
    let arrN = arrNum.slice(0)
    let arrRe = []
    let indexs;
    for (let i = 0; i < num; i++) {
        indexs = MathR(arrN.length)
        arrRe.push(arrN[indexs])
        arrN.splice(indexs, 1)
    }
    return arrRe
}