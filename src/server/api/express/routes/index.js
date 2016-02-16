import express from 'express';
import MessagesController from './../controllers/messages';

const router = express.Router();

router.route("/messages")
    .post(MessagesController.post)
    .get(MessagesController.get);

export default router;
