/*
    1. Create a Promise that resolves with the number 10 after
       3 seconds
    2. Create another Promise that resolves with the number
       20 after 5 seconds

    How can we log out the sum (30) of these two resolved values
    once, after BOTH promises successfully fulfill?

    HINT: Use Google/Documentation to help find an answer
    HINT2: You can Google for something like:
           "resolve 2 promises at the same time javascript"
*/


let promise1=new Promise(res=>{
   setTimeout(()=>{
      res(10)
   },3*1000)
});

let promise2=new Promise(res=>{
   setTimeout(()=>{
      res(20)
   },5*1000)
});

// Promise.all([promise1,promise2]).then((data)=>{
//    console.log(data[0]+data[1]);
// })

promise1.then((data1)=>{
   return data1;
})
.then((data1)=>{
   promise2.then((data2)=>{
      console.log(data1+data2);
      
   })
})
