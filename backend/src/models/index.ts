import User from "./User";
import Resume from "./Resume";
import CoverLetter from "./Coverletter";

const setupAssociations = () => {
  User.hasMany(Resume, {
    foreignKey: "userId",
    as: "resumes",
  });

  User.hasMany(CoverLetter, {
    foreignKey: "userId",
    as: "coverLetters",
  });

  Resume.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  CoverLetter.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

setupAssociations();

export { User, Resume, CoverLetter };

export const getAllModels = () => ({
  User,
  Resume,
  CoverLetter,
});
