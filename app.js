const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members :[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/fbf0e5c618"

    const options = {
        method: "POST",
        auth: "viki5156:29b71ecf1195eeb8bc5e879429c38c16-us8"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server running on port 3000");
});
