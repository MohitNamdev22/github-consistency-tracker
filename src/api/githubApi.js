import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users/'; // GitHub API base URL

export const fetchGitHubContributions = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return [];
  }
};
