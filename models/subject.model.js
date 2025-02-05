const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Subject', {
        subject_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(255), allowNull: false }
    }, {
        tableName: 'Subject',
        timestamps: false
    });
};
