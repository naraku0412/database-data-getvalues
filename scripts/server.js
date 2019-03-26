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
         var key = JSON.stringify(body);
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


app.post('/api/snap/setRandoms',function(req,res){
        var body = req.body;
        console.log(body);
        var tbname = JSON.stringify(body.tbname);
        console.log(tbname);
        jsonbody = JSON.stringify(body);
        console.log(jsonbody);
        var input  = JSON.parse(jsonbody);
        id = input.id;
        console.log(id.length);
        idlength=id.length;
        var arrvalue = new Array(idlength); 
        var arrtime = new Array(idlength);
        var qty = new Array(idlength);
        var error = new Array(idlength);
        var tb = "SCADA_Analog";
        var tbd = "SCADA_Digital";
        tbname=tbname.replace(/"/g,""); 
        var timestamp = Date.parse(new Date());
        data = '{"replyCode":{"code":0,"message":"成功"},"result":{"value":["8.2200002670288086","0","12.510000228881836","2.869999885559082"],"qty":[1,0,1,1,1],"time":[1520855807,0,1520855807,1520855807],"error":[0,1,0,0]}}';
        
        if(tb==tbname){
          for(var i = 0; i<idlength;i++){
              arrvalue[i]=Math.random();
              arrtime[i]=timestamp;
              qty[i]=1;
              error[i]=0;
          }
          console.log(arrvalue);
          console.log(arrtime);
         obj = JSON.parse(data);
         obj.replyCode.code=0;
         obj.replyCode.message="成功";
         obj.result.value=arrvalue;
         obj.result.qty=qty;
         obj.result.time=arrtime;
         obj.result.error=error;         
         res.send(obj);
        }else if(tbname==tbd){
          for(var i = 0; i<idlength;i++){
              arrvalue[i]=Math.round(Math.random());
              arrtime[i]=timestamp;
              qty[i]=1;
              error[i]=0;
          }
          console.log(arrvalue);
          console.log(arrtime);
          obj = JSON.parse(data);
          obj.replyCode.code=0;
          obj.replyCode.message="成功";
          obj.result.value=arrvalue;
          obj.result.qty=qty;
          obj.result.time=arrtime;
          obj.result.error=error;
          res.send(obj);
        }else{
         res.send("please input  the right tbname"); 
        }       
});

app.post('/api/snap/setAscends',function(req,res){
        var body = req.body;
        console.log(body);
        var tbname = JSON.stringify(body.tbname);
        console.log(tbname);
        jsonbody = JSON.stringify(body);
        console.log(jsonbody);
        var input  = JSON.parse(jsonbody);
        id = input.id;
        console.log(id.length);
        idlength=id.length;
        var arrvalue = new Array(idlength);
        var arrtime = new Array(idlength);
        var qty = new Array(idlength);
        var error = new Array(idlength);
        var arrf = new Array(idlength);
        var arrint = new Array(idlength);
        if(runsign==strsign){
          for(var i = 0; i<idlength;i++){
             arrvalue[i]=Math.ceil(Math.random()*10);
             qty[i]=1;
             error[i]=0;
             arrf[i] = (Math.random()).toFixed(2);
             arrint[i]= arrvalue[i];
             arrvalue[i]=arrvalue[i] + arrf[i].substring(1,4);    
          }
           var timestamp = Date.parse(new Date());
           data = '{"replyCode":{"code":0,"message":"成功"},"result":{"value":["8.2200002670288086","0","12.510000228881836","2.869999885559082"],"qty":[1,0,1,1,1],"time":[1520855807,0,1520855807,1520855807],"error":[0,1,0,0]}}';
           for(var i = 0; i<idlength;i++){
              arrtime[i]=timestamp;
              qty[i]=1;
              error[i]=0;
           } 
           obj = JSON.parse(data);
           obj.replyCode.code=0;
           obj.replyCode.message="成功";
           obj.result.value=arrvalue;
           obj.result.qty=qty;
           obj.result.time=arrtime;
           obj.result.error=error;         
           res.send(obj);
        }//end if
        runsign = "assigned";
        arrvalue = arrint;
        console.log(arrvalue);
        console.log(arrf);
        
        var timestamp = Date.parse(new Date());
        data = '{"replyCode":{"code":0,"message":"成功"},"result":{"value":["8.2200002670288086","0","12.510000228881836","2.869999885559082"],"qty":[1,0,1,1,1],"time":[1520855807,0,1520855807,1520855807],"error":[0,1,0,0]}}';
        for(var i = 0; i<idlength;i++){
            var timestamp = Date.parse(new Date());
            arrtime[i]=timestamp;
            qty[i]=1;
            error[i]=0;
            arrvalue[i] = arrvalue[i] + 1;
            arrint[i]= arrvalue[i];
            arrvalue[i]=arrvalue[i] + arrf[i].substring(1,4);    
       } 
        console.log(arrvalue);
        console.log(arrint);
        console.log(arrf);
        obj = JSON.parse(data);
        obj.replyCode.code=0;
        obj.replyCode.message="成功";
        obj.result.value=arrvalue;
        obj.result.qty=qty;
        obj.result.time=arrtime;
        obj.result.error=error;         
        res.send(obj);
});


app.post('/api/snap/setAscendsV',function(req,res){
       var body = req.body;
       console.log(body);
       var key = JSON.stringify(body);
       var jsonbody = JSON.stringify(body);
       var input  = JSON.parse(jsonbody);
       id = input.id;
       console.log(id.length);
       idlength=id.length;
       var strnull='{"replyCode":{"code":-1,"message":"查询的表不存在"}}';
       console.log(strnull);
        callfile.execFile('/workspace/valueget.sh',['-k',key],null,function (error, stdout, stderr) {
           if(error){
            console.log(error);
            res.send(error);
            }else if(stderr){
            console.log(stderr);
            res.send(stderr);
            }else if(stdout.trim()==strnull.trim()){//数据库里面没有值，重新生成
             console.log(stdout);
             console.log("Data is not existed");      
             var arrvalue = new Array(idlength); 
             var arrtime = new Array(idlength);
             var qty = new Array(idlength);
             var error = new Array(idlength);
             var tb = "SCADA_Analog";
             var tbd = "SCADA_Digital";
             var timestamp = Date.parse(new Date());
             data = '{"replyCode":{"code":0,"message":"成功"},"result":{"value":["8.2200002670288086","0","12.510000228881836","2.869999885559082"],"qty":[1,0,1,1,1],"time":[1520855807,0,1520855807,1520855807],"error":[0,1,0,0]}}';
               for(var i = 0; i<idlength;i++){
                 arrvalue[i]=Math.random().toFixed(2);
                 arrtime[i]=timestamp;
                 qty[i]=1;
                 error[i]=0;
               }
               console.log(arrvalue);
               console.log(arrtime);
               obj = JSON.parse(data);
               obj.replyCode.code=0;
               obj.replyCode.message="成功";
               obj.result.value=arrvalue;
               obj.result.qty=qty;
               obj.result.time=arrtime;
               obj.result.error=error;         
               res.send(obj);
               value = JSON.stringify(obj);
               console.log("The input key is:");
               console.log(key);
               console.log("The input value is:");
               console.log(value);
               callfile.execFile('/workspace/valueset.sh',['-k',key,'-v',value],null,function (error, stdout, stderr) {
                 if(error){
                  console.log(error);
                  }else if(stderr){
                  console.log(stderr);
                  }else if(stdout){
                  console.log(stdout);
                  }
              });
               console.log("data is set!");
            }else if(stdout){//数据库里能够查到
               
            //value值取出来+1然后重新存入redis
            console.log("the finding stdout is:");
            console.log(stdout);
            //data = JSON.stringify(stdout);
            dataobj = JSON.parse(stdout);
            //console.log("the finding data is:");
            //console.log(dataobj);
            
            console.log("the finding data is:"); 
            console.log(dataobj);
            datavalue = dataobj.result.value;
            console.log("the finding datavalue is:"); 
            console.log(datavalue);
            for (var i=0; i<idlength;i++){
               dataf = parseFloat(datavalue[i]);
               dataf = dataf + 1;
               datavalue[i]=dataf;
            }
            //datavalue浮点数转成字符串
            for (var i=0;i<idlength;i++){
              datavalue[i]=datavalue[i].toString();
            }
 

            dataobj.result.value = datavalue;
            res.send(dataobj);
            var value = JSON.stringify(dataobj);
            callfile.execFile('/workspace/valueset.sh',['-k',key,'-v',value],null,function (error, stdout, stderr) {
            
            });
            }else{
             console.log("undefined!");
            }
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
