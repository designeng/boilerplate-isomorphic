// MessagesController
import models from '../models';

const MessagesController = {

    post: function (req, res) {
            var text = req.param('text');

            models.Message.create({
                text: text,
            }).then(
                function() {
                    res.json({ text: text});
                },
                function(error) {
                    res.json({ error: error});
                }
            );
    },

    get: function (req, res) {
            models.Message.findAll().then(function(messages) {
                res.json({ messages });
            });
    }

}

module.exports = MessagesController;