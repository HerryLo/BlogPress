// setTimeout(()=> {
//     console.log('setTimeOut1 end');
// }, 0)

// new Promise((resolve, reject)=> {
//     console.log('Promise1 函数运行');
//     resolve();
// }).then(()=> {
//     console.log('Promise1 then回调执行');
//     setTimeout(()=> {
//         console.log('setTimeOut2 end');
//     }, 0)
//     new Promise((resolve, reject)=> {
//         console.log('Promise2 函数运行');
//         resolve();
//     }).then(()=> {
//         console.log('Promise2 then回调执行');
//     })
// })
// console.log('script end');

setTimeout(() => {
    console.log('timer21')
}, 0)

Promise.resolve().then(function() {
    console.log('promise1')
})