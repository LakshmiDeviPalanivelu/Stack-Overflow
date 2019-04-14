const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
//import * as firebase from 'firebase';
//import { constants } from 'fs';

const config = {
  apiKey: "AIzaSyCJtsxEi9qJxHWXWs6mLM17lLKzvy_lYRk",
  authDomain: "test-62549.firebaseapp.com",
  databaseURL: "https://test-62549.firebaseio.com",
  projectId: "test-62549",
  storageBucket: "test-62549.appspot.com",
  messagingSenderId: "163255189800"
};

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let transaction = [
    {
      name: 'Customer 1',
      transactionHistory: {
          January: [120, 110, 90],
          February: [110, 80, 90],
          March: [70, 150, 40]
      }      
    },
    {
      name: 'Customer 2',
      transactionHistory: {
          January: [130, 110, 80],
          February: [140, 150, 60],
          March: [30, 160, 110]
      }      
    }
];

firebase.initializeApp(config);

const firebaseDB = firebase.database();


// setTimeout(()=> {
//   firebaseDB.ref('name').set('Name1')
// },3000);

// setTimeout(()=> {
//   firebaseDB.ref('name').off()
// },4000);

// setTimeout(()=> {
//   firebaseDB.ref('name').set('Name2')
// },6000);

app.get('/api/transactions', (req,res) => {
  let dummyData = [];
  firebaseDB.ref('dummy').on('value', (snapshot)=> {
    if(snapshot.val()) {
      dummyData = snapshot.val();
    } 
  })
	res.send(dummyData);
})

const func1 = function(data) {
  let dummyData = [];
      firebaseDB.ref('dummy').on('value', (snapshot)=> {
        if(snapshot.val()) {
          dummyData = snapshot.val();
        } 
      })
      dummyData.push(data);
  firebaseDB.ref('dummy').set(
    dummyData
  )
}

app.post('/api/data', (req,res) => {
  func1(req.body.data);
  res.send('success');
})

app.listen(port, () => {
	console.log('Server is running');
})