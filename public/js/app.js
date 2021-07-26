//  console.log('Hello this inside public/js/app.js');yes

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data)=>{
        console.log(data);
    })
});


// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//         // console.log(data.location);
//         // console.log(data.address);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne =document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault(); // it letting the function run it not refresh
    const location = search.value; 
    console.log(location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
                console.log(data.error);
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        // console.log(data.location);
        // console.log(data.address);
    });
});
})