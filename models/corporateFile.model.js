const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('CorporateFile', {
        corporate_file_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        file_path: { type: DataTypes.STRING(255), allowNull: false },
        uploaded_at: { type: DataTypes.DATE, allowNull: false }
    }, {
        tableName: 'CorporateFile',
        timestamps: false
    });
};
