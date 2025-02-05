const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PaymentDetail', {
        payment_detail_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        item_description: { type: DataTypes.STRING(255), allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, {
        tableName: 'PaymentDetail',
        timestamps: false
    });
};
