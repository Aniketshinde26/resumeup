const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export const initiateGithubLogin = () => {
  const redirectUri = `${window.location.origin}/auth/github/callback`;

  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&scope=user:email`;

  window.location.href = githubUrl;
};
