const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console.log(__dirname);
// console.log(__filename);

// define path for express config
const publicDirectoryPath = path.join(__dirname,"../public"); // this get the path of public folder
const viewsPath = path.join(__dirname,'../templates/views'); // this is when we change the views name to templates
const partialPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs'); 
app.set('views',viewsPath); // here we set views to what we get from templates dir as viewsPath
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // this make the use of public file directory or home Page

// for handlebar setup
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abhay Verma',
        contact:'8957915606'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Abhay Verma',
        contact:'8957915606'
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        whatHelp:'Not Connating page',
        contact:'8957915606'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhay Verma',
        errorMassage:'Page Not Found'
    });
});



app.get('./public/index',(req,res)=>{
    res.send("<h1>Hello Express</h>");
})
// app.get('../public/help',(req,res)=>{
//     res.send([{
//         Name:'Abhay',
//         age:23
//     },{
//         Name:'sarah',
//         age:23
//     }]
//     );

// })
app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1>');
})
app.get('/weather',(req,res)=>{
    res.send({
        forecast:"It is Snowing",
        location:'philadelphia'
    });
})

app.listen(3000,()=>{
    console.log('Server is Up on Port 3000');
})