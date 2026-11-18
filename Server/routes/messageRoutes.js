const router = require("express").Router();
const { sendMessage, getMessages, markRead } = require("../controllers/messageController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", sendMessage);
router.get("/", protect, adminOnly, getMessages);
router.put("/:id/read", protect, adminOnly, markRead);

module.exports = router;