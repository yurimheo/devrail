const { Sequelize } = require("sequelize");
require("dotenv").config();

// ✅ Sequelize DB 설정
const sequelize = new Sequelize(
  process.env.DB_NAME || "devrail",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "1234",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: console.log,
  }
);

// ✅ 모델 불러오기
const User = require("./user.model")(sequelize);
const Corporate = require("./corporate.model")(sequelize);
const UserCorporate = require("./userCorporate.model")(sequelize);
const Subject = require("./subject.model")(sequelize);
const SubjectCourse = require("./subjectCourse.model")(sequelize);
const CorporateFile = require("./corporateFile.model")(sequelize);
const Payment = require("./payment.model")(sequelize);
const PaymentDetail = require("./paymentDetail.model")(sequelize);

// 🔗 관계 설정
User.hasMany(Corporate, { foreignKey: "user_id", onDelete: "CASCADE" });
Corporate.belongsTo(User, { foreignKey: "user_id" });

User.belongsToMany(Corporate, { through: UserCorporate, foreignKey: "user_id" });
Corporate.belongsToMany(User, { through: UserCorporate, foreignKey: "corporate_id" });

Subject.hasMany(SubjectCourse, { foreignKey: "subject_id", onDelete: "CASCADE" });
SubjectCourse.belongsTo(Subject, { foreignKey: "subject_id" });

Corporate.hasMany(CorporateFile, { foreignKey: "corporate_id", onDelete: "CASCADE" });
CorporateFile.belongsTo(Corporate, { foreignKey: "corporate_id" });

Subject.hasMany(CorporateFile, { foreignKey: "subject_id", onDelete: "SET NULL" });
CorporateFile.belongsTo(Subject, { foreignKey: "subject_id" });

User.hasMany(Payment, { foreignKey: "user_id", onDelete: "CASCADE" });
Payment.belongsTo(User, { foreignKey: "user_id" });

Payment.hasMany(PaymentDetail, { foreignKey: "payment_id", onDelete: "CASCADE" });
PaymentDetail.belongsTo(Payment, { foreignKey: "payment_id" });

// ✅ 데이터베이스 동기화
sequelize.sync()
  .then(() => console.log("✅ Database synchronized successfully!"))
  .catch(err => console.error("❌ Database sync error:", err));

module.exports = {
  sequelize,
  User,
  Corporate,
  UserCorporate,
  Subject,
  SubjectCourse,
  CorporateFile,
  Payment,
  PaymentDetail,
};
