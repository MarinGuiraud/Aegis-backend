import express from "express";
import fs from "fs";
import nodemailer from "nodemailer"
import cors from "cors"
import { EMAIL_ADRESS, EMAIL_PASSWORD, EMAIL_SEND_TO, lol_news_list, 
  lol_prog_list, 
  lol_results_list, 
  lol_team_list, 
  tft_guides_list, 
  tft_news_list, 
  tft_prog_list, 
  tft_results_list, 
  tft_team_list, 
  youtube_channels_list } from "./data.js";
import {TwitchApiService} from "./twitch_api.js"

// require('dotenv')
const app = express();
const twitch_api = new(TwitchApiService)
// To connect in dev env
app.use(cors({
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials:true,
    origin:["http://localhost:4200", "http://127.0.0.1:4200", "https://aegis-site.web.app"]
}))

app.use(express.json());

// Launch server on specific port
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log("Le server est sur le port " + port);
})

app.get("/", (req, res) => {
  res.send("Ca fonctionne !!!!")
})
// Actual API LOL
app.get("/api/lol_articles", (req, res) => {
    res.send(lol_news_list)
})

app.get("/api/lol_articles/page/:pageNumber", (req, res) => {
    const pageNumber = +req.params.pageNumber;
    var newsOnPage = []
    if(pageNumber == 1){
      newsOnPage = lol_news_list.slice(0,6)
    }
    else{
      newsOnPage = lol_news_list.slice((pageNumber-1)*6,(pageNumber-1)*6+5)
    }
    res.send(newsOnPage)
})

app.get("/api/lol_articles/bottom_articles/:articleTitle", (req, res) => {
  const article_title = req.params.articleTitle
  var newsOnBottom = []
  for(let i=0; i<lol_news_list.length; i++){
    if(lol_news_list[i].link != article_title){
      newsOnBottom.push(lol_news_list[i])
    }
    if(newsOnBottom.length == 3){
      break
    }
  }
  res.send(newsOnBottom)
})

app.get("/api/lol_articles/:articleTitle", (req, res) => {
  const article_title = req.params.articleTitle
  let raw_data = fs.readFileSync("../data/lol/articles/" + article_title + ".json")
  let article = JSON.parse(raw_data)
  res.send(article)
})

app.get("/api/lol_programmation", (req, res) => {
  res.send(lol_prog_list)
})

app.get("/api/lol_team", (req, res) => {
  res.send(lol_team_list)
})

app.get("/api/lol_results", (req, res) => {
  res.send(lol_results_list)
})

///////////////////////////
///// Actual API TFT /////
/////////////////////////
app.get("/api/tft_articles", (req, res) => {
  res.send(tft_news_list)
})

app.get("/api/tft_articles/page/:pageNumber", (req, res) => {
  const pageNumber = +req.params.pageNumber;
  const tft_news = tft_news_list
  var newsOnPage
  if(pageNumber == 1){
    newsOnPage = tft_news_list.slice(0,6)
  }
  else{
    newsOnPage = tft_news_list.slice((pageNumber-1)*6,(pageNumber-1)*6+5)
  }
  res.send(newsOnPage)
})

app.get("/api/tft_articles/:articleTitle", (req, res) => {
  const article_title = req.params.articleTitle
  let raw_data = fs.readFileSync("../data/tft/articles/" + article_title + ".json")
  let article = JSON.parse(raw_data)
  res.send(article)
})

app.get("/api/tft_articles/bottom_articles/:articleTitle", (req, res) => {
  const article_title = req.params.articleTitle
  var newsOnBottom = []
  for(let i=0; i<tft_news_list.length; i++){
    if(tft_news_list[i].link != article_title){
      newsOnBottom.push(tft_news_list[i])
    }
    if(newsOnBottom.length == 3){
      break
    }
  }
  res.send(newsOnBottom)
})

app.get("/api/tft_guides", (req, res) => {
  res.send(tft_guides_list)
})

app.get("/api/tft_programmation", (req, res) => {
  res.send(tft_prog_list)
})

app.get("/api/tft_team", (req, res) => {
  res.send(tft_team_list)
})

app.get("/api/tft_results", (req, res) => {
  res.send(tft_results_list)
})

// TWITCH API REQUEST
app.get("/api/twitch_live_status", (req, res) => {
  let api_res = twitch_api.getLiveStatus()
    .then(function(response){
      res.send(response.data.data)
    })
    .catch(function(error){
        res.send(error)
    })
})

// Youtube channels request
app.get("/api/youtube_channels",  (req, res) => {
  res.send(youtube_channels_list)
})

// Contact Form
app.post("/api/contact", (req, res) => {
  const jsonData = JSON.parse(req.body.body) 
  sendMail(jsonData)
})  

function sendMail(dataForm){
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, //ssl
    auth: {
        user:EMAIL_ADRESS,
        pass:EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from : EMAIL_ADRESS,
    to:EMAIL_SEND_TO,
    subject:dataForm.object,
    text:dataForm.message
  }

  let mailOptionsReply = {
    from : EMAIL_ADRESS,
    to:dataForm.email,
    subject:"Merci d'avoir contacté Aegis !",
    text:"Bonjour \n\n Nous avons bien reçu votre mail et nous vous répondrons au plus vite \n\n Bonne journée \n\n SHIELDS UP !!!"
  }

  let infoReply = transporter.sendMail(mailOptionsReply);
  var resMail = {};
  transporter.sendMail(mailOptions, function(error, responseStatus){
    if(error){
      resMail["status"] = error
      resMail["code"] = 500
    }
    else{
      resMail["status"] = responseStatus
      resMail["code"] = 500
    }
  });
}