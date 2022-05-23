/* Global Variables */
const apiKey = '&appid=1578bc5baa951112196deacea83008bf&units=imperial';
const baseurl='https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = (date.getMonth()+1)+'.'+ date.getDate()+'.'+ date.getFullYear();

// get fired when the fronend  sends Get req back to server 
// to retrive data and update UI
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = 'temprature now :'+Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = 'My Feelings:'+allData.feel;
    document.getElementById("date").innerHTML ='Date :'+allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }




// fetch data from WeatherMap's Server 
let fetch_data_fromWeather= async({zip,baseurl,apiKey})=>{
   try{
        let data= await fetch(baseurl+zip+apiKey);
        let dataparsd=await data.json()
        if (dataparsd.cod==='404')
        {
            alert('not valid zip code please enter valid zip such as 73301');
            throw `${dataparsd.message}`
        }
        return dataparsd;
        }
        catch(e){
            console.log(e)
           
        }
} 

// add &save data from frontend on local server
let add_data_to_local_server=async ({ temp,
    feel,newDate})=>{
try{
    let res1=await fetch('/adddata',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
            temp,
            feel,
            date:newDate 
        })
    });
    return res1;
}
catch(e){
    console.log(e);
}
    
}



// main func that mange sending and retreving 
let main = async()=>{
let zip=document.getElementById("zip").value;
const feel=document.getElementById("feelings").value;
let dataparsd= await fetch_data_fromWeather({zip,baseurl,apiKey});
//console.log(dataparsd);
let temp = dataparsd.main.temp;
let res1=await add_data_to_local_server({ temp,
    feel,newDate});
let msg1= await res1.json();
console.log(msg1.msg);
 await retrieveData();

}

// CLick event listener on UI Button that's  get main fn fired
document.getElementById('generate').addEventListener('click',main);