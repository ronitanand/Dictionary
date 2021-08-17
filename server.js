const express=require('express');
const app=express();
const axios = require('axios').default;
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.redirect('/dictionary');
})

app.get('/dictionary',(req,res)=>{
        res.render('home');
})

app.post('/dictionary/browse',(req,res)=>{
    res.redirect('/dictionary/browse/'+req.body.searchedTerm);
})

app.get('/dictionary/browse/:term',async (req,res)=>{
    const word=req.params.term;
    const data=await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+word);
    word_data=data.data[0];
    res.render('meaning',{word,word_data});
})
app.listen(5000,()=>{
    console.log('server started on port 5000');
})