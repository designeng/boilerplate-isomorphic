export default function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {}
    });

    return Message;
};
