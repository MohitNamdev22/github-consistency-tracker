import axios from 'axios';

export const fetchGitHubUserData = async (token) => {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    return response.data; // Return the user data
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};
