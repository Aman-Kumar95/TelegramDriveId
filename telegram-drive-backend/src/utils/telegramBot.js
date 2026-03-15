import axios from "axios";
import { BOT_TOKEN } from "../config/env.js";
import Media from "../models/Media.js";

// console.log("BOT TOKEN =>", BOT_TOKEN);

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

let lastUpdateId = 0;

export const startBot = () => {
  setInterval(async () => {
    try {
      const res = await axios.get(
        `${TELEGRAM_API}/getUpdates?offset=${lastUpdateId + 1}`
      );
      const updates = res.data.result;

      for (let update of updates) {
        lastUpdateId = update.update_id;
        const message = update.message || update.channel_post;
        if (!message) {
          continue;
        }
        if (message.photo) {
          const photoArray = message.photo;

          const fileId = photoArray[photoArray.length - 1].file_id;
          await Media.create({
            fileId: fileId,
            type: "image",
          });
          console.log("Image recieved");
          console.log("Image saved to DB");
          console.log("file_id", fileId);
        }

        if (message.text) {
          const text = message.text;

          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

          /* 
        // for updating metadata but it overides metadata 
          await Media.updateMany(
            {
              type: "image",
              uploadedAt: { $gte: fiveMinutesAgo },
            },
            {
              $set: { metadata: text },
            }
          );*/

          const recentImages = await Media.find({
            type: "image",
            uploadedAt: { $gte: fiveMinutesAgo },
          });

          for(let img of recentImages){
            if (img.metadata && img.metadata.trim()!="") {
              img.metadata= img.metadata + " " + text;
            }
            else{
              img.metadata= text;
            }

            await img.save();
          }

          console.log(" Text received:", text);
          console.log(` Metadata attached to images`);
        }

        if (message.video) {
          console.log("Video recieved");
        }

        if (message.text) {
          console.log("Text recieved", message.text);
        }
      }
    } catch (error) {
      console.error("Bot error:", error.message);
    }
  }, 3000);
};
