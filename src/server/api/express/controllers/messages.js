// MessagesController
import models from '../models';

const MessagesController = {

    post: function (req, res) {
            var user = req.param('user');
            var text = req.param('text');

            models.Message.create({
                user: user,
                text: text
            }).then(
                function() {
                    res.json({ text: text, user: user});
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