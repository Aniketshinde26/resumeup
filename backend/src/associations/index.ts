import User from "../models/User";
import Resume from "../models/Resume";

User.hasMany(Resume, {
  foreignKey: "userId",
  as: "resumes",
});

Resume.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Resume };
