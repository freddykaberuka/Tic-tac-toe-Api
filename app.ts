const express = require('express')

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Tic tac toe game')
})
app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
});