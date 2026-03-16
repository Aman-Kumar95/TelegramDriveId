import express from "express";
import { BOT_TOKEN } from "../config/env.js";
import { CHANNEL_ID } from  "../config/env.js"
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const CHANNELID = `${CHANNEL_ID}`;

router.post("/upload",upload.single("image"),async(req,res)=>{
    try{
        console.log("Upload route hit");
        if (!req.file) {
            return res.status(400).json({error: "No file recieved"});
        }

        const form = new FormData();
        form.append("chat_id",CHANNELID);
        form.append("photo",req.file.buffer,{
            filename:req.file.originalname,
        })

        await axios.post(`${TELEGRAM_API}/sendPhoto`,form,{
            headers:form.getHeaders(),
        })
       res.json({message: "Image uploaded to Telegram"}) 
    }

    catch(error){
        console.error(error);
        res.status(500).json({error: "Upload Failed"})
    }
})

export default router;