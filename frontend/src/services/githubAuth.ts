const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/auth/github/callback";

export const initiateGithubLogin = () => {
  // We construct the URL with the 'user:email' scope to make sure we get their email
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
  
  // Redirect the entire window to GitHub
  window.location.href = githubUrl;
};