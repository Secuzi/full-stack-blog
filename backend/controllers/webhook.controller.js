import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const webhook_secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhook_secret) {
    throw new Error("Webhook secret needed!");
  }
  const payload = req.body;
  const headers = req.headers;
  const wh = new Webhook(webhook_secret);
  let msg;
  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Webhook verification failed!" });
  }
  if (msg.type === "user.created") {
    const newUser = new User({
      clerk_userid: msg.data.id,
      username: msg.data.username || msg.data.email_addresses[0].email_address,
      email: msg.data.email_addresses[0].email_address,
      img: msg.data.profile_image_url,
    });
    console.log(newUser);
    await newUser.save();
  }

  if (msg.type === "user.deleted") {
    await User.findOneAndDelete({ clerk_userid: msg.data.id });
    // TODO: Remove the post and comments which are associated wid dat user
  }

  if (msg.type === "user.updated") {
    try {
      const update = await User.findOneAndUpdate(
        { clerk_userid: msg.data.id },
        {
          username:
            msg.data.username || msg.data.email_addresses[0].email_address,
          email: msg.data.email_addresses[0].email_address,
          img: msg.data.profile_image_url,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  return res.status(200).json({ success: true, message: "Webhook received" });
};
