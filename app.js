//server.js
const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile("index.html",{root:__dirname+"/"})  
    console.log("served")
});


app.get("/usables/:fileName",(request,response)=>{
    console.log("serving file "+request.params.fileName)
    response.sendFile(request.params.fileName,{root:__dirname+"/usables/"})
})
app.get("/resources/:fileName",(request,response)=>{
    console.log("serving file "+request.params.fileName)
    response.sendFile(request.params.fileName,{root:__dirname+"/resources/"})
})

app.get("/file/:fileName",(request,response)=>{
    console.log("serving file "+request.params.fileName)
    response.sendFile(request.params.fileName,{root:__dirname+"/"})
})



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
