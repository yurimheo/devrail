const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        user_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(255), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        role: { type: DataTypes.ENUM('individual', 'corporate_member', 'free'), allowNull: false },
        password: { type: DataTypes.STRING(255), allowNull: false }
    }, {
        tableName: 'User',
        timestamps: false
    });
};
