const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Corporate', {
        corporate_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(255), allowNull: false },
        max: { type: DataTypes.INTEGER, allowNull: true }
    }, {
        tableName: 'Corporate',
        timestamps: false
    });
};
