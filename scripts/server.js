var express = require('express'); 
var http = require('http'); 
var app = express();
var url = require("url");
var port = 8888; 
var callfile = require('child_process'); 
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

http.createServer(app).listen(port); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all("*",function(req,res,next){ 
        res.header("Access-Control-Allow-Origin","*"); 
        res.header("Access-Control-Allow-Headers","content-type"); 
        res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS"); 
          if (req.method.toLowerCase() == 'options') 
               res.send(200); 
          else 
               next(); 
});
app.use(cors({
    methods:['GET','POST'],
    //alloweHeaders:['Conten-Type', 'Authorization']
    //alloweHeaders:['Conten-Type', 'application/json']
    alloweHeaders:['Conten-Type', 'application/x-www-form-urlencoded']
}));
app.get('/', function (req, res) {
   res.send('Hello World');
})
app.post('/api/snap/getValues',function(req,res){ 
         var body = req.body;
         var key = JSON.stringify(body.key);
         console.log("key:");
         console.log(key);
         callfile.execFile('/workspace/valueget.sh',['-k',key],null,function (error, stdout, stderr) {
            if(error){
            console.log(error);
            res.send(error);
            }else if(stderr){
            console.log(stderr);
            res.send(stderr);
            }else if(stdout){
            console.log(stdout);
            res.send(stdout);}
       });
}); 

app.post('/api/snap/setValues',function(req,res){ 
         var body = req.body;
         var key = JSON.stringify(body.key);
         console.log("key:");
         console.log(key);
         var value = JSON.stringify(body.value);
         console.log("value:");
         console.log(value);
         callfile.execFile('/workspace/valueset.sh',['-k',key,'-v',value],null,function (error, stdout, stderr) {
           if(error){
            console.log(error);
            res.send(error);
            }else if(stderr){
            console.log(stderr);
            res.send(stderr);
            }else if(stdout){
            console.log(stdout);
            res.send(stdout);}
       });
}); 



app.get('/api/snap/post',function(req,res){ 
         var url_parts = url.parse(req.url,true); 
        // console.log(url_parts);
         var query = url_parts.query; 
         ///console.log(query);
         var key = query.key;
         var value = query.value;
         //res.send('the input key: ' + key );
         //res.send('the input value: ' + value );
         callfile.execFile('/usr/local/bin/put',['-k',key,'-v',value],null,function (error, stdout, stderr) {
              if (error !== null) {
                  console.log('exec error: ' + error);
               }
         console.log('exec result: ' + stdout); 
         res.send("the input process is completed!" +stdout);
           });
});
