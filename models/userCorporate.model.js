module.exports = (sequelize) => {
    return sequelize.define('UserCorporate', {}, { timestamps: false });
};