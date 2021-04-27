const url="https://www.li.cmu.ac.th/nkp.php";
console.log(url);
res=Array.from(url)
console.log(res);

//60 tokens

var json = require('./datapre.json')

//console.log(json);
var sequence=[]
for(let i=0;i<res.length;i++){
    for (x in json){
        if(String(res[i])==String(x)){
            sequence.push(json[x]);        
        }
    }
}
console.log(sequence);

var urlsize=sequence.length
var pad=128-urlsize
if(pad>0){
    for (let i = 0; i<pad;i++){
        sequence.unshift(0)
    }
}
//console.log(sequence);
//console.log(sequence.length);

const tf = require("@tensorflow/tfjs-node");
var x=tf.tensor2d([sequence])
console.log(x.shape)
console.log(x.print())

const model = tf.loadLayersModel("file://model/model.json");
//const preds = model.predict(x);

//console.log(model.predict(x))

model.then(function (res) {
    var x=tf.tensor2d([sequence])
    const prediction = res.predict(x);
    console.log(prediction);
    prediction.print();
}, function (err) {
    console.log(err);
});