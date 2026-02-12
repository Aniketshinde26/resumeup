
// Import all model files explicitly - this executes their .init()
import User from "./User";
import Resume from "./Resume";
import CoverLetter from "./Coverletter";

// Define all associations in one place
const setupAssociations = () => {
  // User associations
  User.hasMany(Resume, {
    foreignKey: "userId",
    as: "resumes",
  });
  
  User.hasMany(CoverLetter, {
    foreignKey: "userId",
    as: "coverLetters",
  });

  // Resume associations
  Resume.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // CoverLetter associations
  CoverLetter.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

// Call setup
setupAssociations();

// Export all models
export { User, Resume, CoverLetter };

// Optional: Export a function to get all models
export const getAllModels = () => ({
  User,
  Resume,
  CoverLetter,
});