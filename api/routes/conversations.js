const router = require("express").Router();
const Conversation = require("../models/Conversation");
const authMiddleware = require("./auth");


// New conversation

router.post("/", authMiddleware, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const query = {
      $or: [
        { members: [req.body.senderId, req.body.receiverId] },
        { members: [req.body.receiverId, req.body.senderId] }
      ]
    };

    const update = {
      $setOnInsert: {
        members: [req.body.senderId, req.body.receiverId]
      }
    };

    const options = {
      upsert: true,
      new: true
    };

    const savedConversation = await Conversation.findOneAndUpdate(query, update, options);
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", authMiddleware,  async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", authMiddleware, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;