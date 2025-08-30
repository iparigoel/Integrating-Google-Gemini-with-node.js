import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res)=> {
  res.send("Hello, world! Gemini");
})

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async(prompt)=> {

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("An error occurred while generating content:", error);
    }
}

app.get('/api/content', async(req,res)=>{
  try{
    const data = req.body.question;
    const result = await generate(data);
    res.send({
      "result": result,
    })
  }catch(err){
    console.log("error:"+err)
  }
})

app.listen(3000, ()=>{
  console.log("Server is up and listening on the port 3000");
})