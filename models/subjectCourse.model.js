const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('SubjectCourse', {
        subject_course_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true }
    }, {
        tableName: 'SubjectCourse',
        timestamps: false
    });
};
