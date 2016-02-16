export default function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
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
