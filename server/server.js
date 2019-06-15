const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/transactions', (req, res) => {
    let dummyData = [];
    firebaseDB.ref('dummy').on('value', (snapshot) => {
        if (snapshot.val()) {
            dummyData = snapshot.val();
        }
    })
    res.send(dummyData);
})

app.post('/api/get_tags', (req, res) => {
    var spawn = require("child_process").spawn;
    console.log("req.body.title: ", req.body.title);
    console.log("req.body.question: ", req.body.question);

    var process = spawn('python3', ["/Users/rajeshri/Downloads/Stack_Overflow_UI/server/hello.py", req.body.title, req.body.question]);
    // console.log("process: ", process)
    process.stdout.on('data', function (data) {
        console.log("response: ", data.toString());
        var data = data.toString().split(" ");
        res.send(data);
    })
})

app.listen(port, () => {
    console.log('Server is running');
})