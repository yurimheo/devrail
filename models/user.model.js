const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        user_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM('individual', 'corporate_member', 'free'),
            allowNull: true,  // ✅ NULL 허용 (기본값 설정)
            defaultValue: "free" // ✅ 기본값 설정
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true  // ✅ 소셜 로그인은 비밀번호 없이 가능해야 함
        },
        login_provider: {
            type: DataTypes.ENUM('email', 'google', 'kakao', 'naver'),
            allowNull: false,
            defaultValue: 'email'
        }
    }, {
        tableName: 'User',
        timestamps: false
    });
};
