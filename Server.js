let express = require('express'),
    fs = require('fs'),
    path = require('path');

let app = express();
app.use(express.static(path.join(__dirname, '/build')));

const getFileData = (file) => {
    JSONdata = fs.readFileSync(JSONfile, 'utf-8')
    JSONObj = JSON.parse(JSONdata);
    return JSONObj;
}

const sendToClient = (res, arr)=> {
    if(arr.length > 0) {
        res.json(arr);
    } else {
        res.json(['No data received'])
    }
}
let JSONfile = path.join(__dirname, 'data','serverData.json');

app.get('/', function(req,res){
    res.send('index.html');
});
app.get('/getCount', function(req,res) {
    let dataObj = getFileData(JSONfile);
    let length = dataObj.length;
    res.json({count : length});
});
app.get('/data/', function(req,res) {
    let dataObj = getFileData(JSONfile);
    let queryFor = req.query.movie;

    console.log('Query for movie as ', queryFor);
    let newArr = dataObj.filter(function(element) {
                    if(element.movie.toLowerCase().includes(queryFor.toLowerCase())) {
                        return true;
                    }
                });
    sendToClient(res, newArr);
});
app.get('/data/:id1/:id2',function(req,res) {
    let dataObj = getFileData(JSONfile);
    if(req.query.movie) {
        let queryFor = req.query.movie;

        console.log('Query for movie as ', queryFor);
        let newArr = dataObj.filter(function(element) {
                        if(element.movie.toLowerCase().includes(queryFor.toLowerCase())) {
                            return true;
                        }
                    });
        let startIndex = req.params.id1;
        let endIndex   = req.params.id2;
        let filteredData = [];
        if(startIndex >= 0 && endIndex >= 0) {
            for(let i = startIndex; i <= endIndex; i++) {
                if(newArr[i]) {
                    filteredData.push(newArr[i]);
                }
            } 
        }
    sendToClient(res, filteredData);
    
    } else {
        let startIndex = req.params.id1;
        let endIndex   = req.params.id2;
        let filteredData = [];
            if(startIndex >= 0 && endIndex >= 0) {
                let dataObj = getFileData(JSONfile);
                for(let i = startIndex; i <= endIndex; i++) {
                    if(dataObj[i]) {
                        filteredData.push(dataObj[i]);
                    }
                } 
            }
            sendToClient(res, filteredData);
    }
})
app.listen(8080, function(){
    console.log('server running');
})