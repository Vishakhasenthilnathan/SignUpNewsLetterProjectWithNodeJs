const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT || 3000,function() {
  console.log("server started on port 3500");
})
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html")
  })
//Setting up the configuration required for mailchimp
client.setConfig({apiKey: "1b3631f5317db5f3ec0e22f75d7b8470-us1",  server: "us1",});
app.post("/",function(req,res) {
  const Firstname = req.body.fname
  const LastName = req.body.lname
  const email = req.body.email
  const subscribingUser = {
    firstName: Firstname,
    lastName: LastName,
    email: email
  }
  const run = async () => {
    try{
     const response = await client.lists.addListMember("4c42dbac41", {
       email_address: subscribingUser.email,
       status: "subscribed",
       merge_fields: {
           FNAME: subscribingUser.firstName,
           LNAME: subscribingUser.lastName
       }
     });
     console.log(response);
     res.sendFile(__dirname+"/success.html");
   }
   catch(err){
     console.log(err);
      res.sendFile(__dirname + "/failure.html");
   }
   };
   run();
 });
 app.post("/failure", function(req, res) {
  res.redirect("/");
});
// api key
// 1b3631f5317db5f3ec0e22f75d7b8470-us1
// list id
// 4c42dbac41
