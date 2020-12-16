// //////////// 1)asynchronous calls   Ajax calls/////////////

const APP = {
    keybase: 'My Name is ',
    keys: [],
    init() {
      //start the app
      document.getElementById('btnSave').addEventListener('click', APP.saveChar);
      document.querySelector('header').addEventListener('click', APP.loadChar);
      APP.loadShows();
    },
    saveChar(ev) {
      ev.preventDefault();
      let show = document.getElementById('show').value.trim();
      let char = document.getElementById('char').value.trim();
      if (show && char) {
        //if both a show and character are provided
        let key = APP.keybase + show.toLowerCase();
        let storage = localStorage.getItem(key);
        let chars = [];
        if (storage) {
          chars = JSON.parse(storage);
        }
        chars.push(char);
        chars = Array.from(new Set(chars));
        localStorage.setItem(key, JSON.stringify(chars));
        document.getElementById('show').value = '';
        document.getElementById('char').value = '';
  
        APP.loadShows();
      }
    },
    loadShows() {
      //go to localstorage and retrieve all the keys that start with APP.keybase
      let num = localStorage.length;
      if (num) {
        APP.keys = []; //reset the keys array
        for (let i = 0; i < num; i++) {
          let key = localStorage.key(i);
          if (key.startsWith(APP.keybase)) {
            APP.keys.push(key);
          }
        }
        APP.keys.sort();
        APP.buildNav();
      }
    },
    buildNav() {
      let nav = document.querySelector('header');
      nav.innerHTML = '';
      let foot = document.querySelector('footer');
      foot.innerHTML = '';
      let df = document.createDocumentFragment();
      APP.keys.forEach((key) => {
        //create a new anchor in the header for each show
        let a = document.createElement('a');
        a.className = 'show';
        a.textContent = key.replace(APP.keybase, '');
        df.append(a);
      });
      nav.append(df);
    },
    loadChar(ev) {
      if (ev.target.tagName === 'A') {
        //put the show name into the input field
        let show = ev.target.textContent.toLowerCase();
        document.getElementById('show').value = show;
        //remove old active show class
        //set current active class
        let oldactive = document.querySelector('header a.active');
        if (oldactive) {
          oldactive.classList.remove('active');
        }
        ev.target.classList.add('active');
        //get the characters for the show and build the footer
        let key = APP.keybase + show;
        let storage = localStorage.getItem(key);
        if (storage) {
          let chars = JSON.parse(storage);
          APP.buildChars(chars);
        }
      }
    },
    buildChars(chars) {
      let foot = document.querySelector('footer');
      foot.innerHTML = '';
      let df = document.createDocumentFragment();
      chars.forEach((char) => {
        //build the spans in the footer
        let span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        df.append(span);
      });
      foot.append(df);
    },
  };
  
  document.addEventListener('DOMContentLoaded', APP.init);










// console.log("1st line");
// sub();

// function add(){
//     debugger
//     console.log("2nd line");
// };

// setTimeout(()=>{
//     debugger
//     console.log("3rd line");
// },5000);


// var xml=new XMLHttpRequest();
// xml.addEventListener('readystatechange' , ()=>{
//     // console.log(xml,xml.readyState);
//     if(xml.readyState===4 && xml.status===200){
//         console.log(xml.responseText);
//     }else if(xml.readyState===4){
//         console.log("couldnt fetch the data")
//     }
// })
// xml.open('GET','https://jsonplaceholder.typicode.com/todos/')
// xml.send();


// var xml=new XMLHttpRequest();
// xml.addEventListener('readystatechange' , ()=>{
//     // console.log(xml,xml.readyState);
//     if(xml.readyState===4 && xml.status>=200){
//         console.log(JSON.parse(xml.response));
//     }else if(xml.readyState===4){
//         console.log("couldnt fetch the data")
//     }
// })
// xml.open('POST','https://jsonplaceholder.typicode.com/posts',JSON.stringify({title: 'foo',
// body: 'bar',
// userId: 11,   headers: {
//   "Content-type": "application/json; charset=UTF-8"
// }}))
// xml.send();




// function sub(){
//     debugger
//     console.log("4th line");
// }






////////////////get request/////////////////

// var xml=new XMLHttpRequest();
// xml.addEventListener('readystatechange' , ()=>{
//     // console.log(xml,xml.readyState);
//     if(xml.readyState===4 && xml.status===200){
//         console.log(xml.responseText);
//     }else if(xml.readyState===4){
//         console.log("couldnt fetch the data")
//     }
// })
// xml.open('GET','https://jsonplaceholder.typicode.com/todos/')
// xml.send();


/////////////////////post request///////////

// var xml=new XMLHttpRequest();
// xml.addEventListener('readystatechange' , ()=>{
//     // console.log(xml,xml.readyState);
//     if(xml.readyState===4 && xml.status>=200){
//         console.log(JSON.parse(xml.response));
//     }else if(xml.readyState===4){
//         console.log("couldnt fetch the data")
//     }
// })
// xml.open('POST','https://jsonplaceholder.typicode.com/posts',JSON.stringify({title: 'foo',
// body: 'bar',
// userId: 1,   headers: {
//   "Content-type": "application/json; charset=UTF-8"
// }}))
// xml.send();




// ////////////////2)  fetch////////////////



//////get

// fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
//   .then(response => response.json())
//   .then(json => console.log(json))

////post

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: 'foo',
//       body: 'bar',
//       userId: 1
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   })
//   .then(response => response.json())
//   .then(json => console.log(json))







// ////////////////3)call backs////////////////

// var data=[{id:1,name:"venkat",age:10},{id:2,name:"shiva",age:20},{id:1,name:"ravi",age:30}];

// function get(){
//   setTimeout(()=>{
//       var output='';
//       data.forEach((ele)=>{
//          output+=`<li> ${ele.name} and his age is ${ele.age} </li>`;
//       });
//       document.body.innerHTML=output;
//   },1000)
// }

// function add(newRecord,callback){
//   setTimeout(()=>{
//        data.push(newRecord)
//        callback()
//   },2000)
// }

// add({id:4,name:"harry",age:40},get);
// //get();







// ////////////4)promises/////////////

// var data=[{id:1,name:"venkat",age:10},{id:2,name:"shiva",age:20},{id:1,name:"ravi",age:30}];

// function get(){
//   setTimeout(()=>{
//       var output='';
//       data.forEach((ele)=>{
//          output+=`<li> ${ele.name} and his age is ${ele.age} </li>`;
//       });
//       document.body.innerHTML=output;
//   },1000)
// }

// function add(newRecord){
//   return  promise=new Promise((resolve,reject)=>{

//     setTimeout(()=>{
//       data.push(newRecord)
//       var isDone=false
//       if(!isDone){
//         resolve()
//       }else{
//         reject('something went wrong')
//       }
//  },2000)
//   })
// }
// add({id:4,name:"harry",age:40}).then(get
// ).catch(err=>{
//   console.log(err);
// })






// ////////////////5)async await//////////

// var data=[{id:1,name:"venkat",age:10},{id:2,name:"shiva",age:20},{id:1,name:"ravi",age:30}];

// function get(){
//   setTimeout(()=>{
//       var output='';
//       data.forEach((ele)=>{
//          output+=`<li> ${ele.name} and his age is ${ele.age} </li>`;
//       });
//       document.body.innerHTML=output;
//   },1000)
// }

// function add(newRecord){
//   return  promise=new Promise((resolve,reject)=>{

//     setTimeout(()=>{
//       data.push(newRecord)
//       var isDone=false
//       if(!isDone){
//         resolve()
//       }else{
//         reject('something went wrong')
//       }
//  },2000)
//   })
// }


// async function main(){
//   await add({id:4,name:"harry",age:40});
//   get();
// }
// main();




















