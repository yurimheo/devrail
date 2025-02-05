const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Payment', {
        payment_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false }
    }, {
        tableName: 'Payment',
        timestamps: false
    });
};
