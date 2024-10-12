import axios from 'axios';

// Function to fetch the GitHub user data
export const fetchGitHubUserData = async (token) => {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data from GitHub.');
  }
};

// Function to fetch contributions from the user's GitHub profile for the last 7 days
export const fetchGitHubContributions = async (token, username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const pushEvents = response.data.filter(
      (event) => event.type === 'PushEvent'
    );

    const contributions = {
      totalContributions: pushEvents.length,
      weeks: [],
    };

    const currentWeek = new Date();
    const pastWeek = new Date();
    pastWeek.setDate(currentWeek.getDate() - 7);

    // Collect data for the last 7 days
    for (let i = 0; i < 7; i++) {
      const day = new Date(pastWeek);
      day.setDate(pastWeek.getDate() + i);
      const contributionCount = pushEvents.filter((event) => {
        const eventDate = new Date(event.created_at);
        return (
          eventDate.toDateString() === day.toDateString() && eventDate <= currentWeek
        );
      }).length;

      contributions.weeks.push({
        contributionDays: [{ date: day.toISOString(), contributionCount }],
        contributionCount,
      });
    }

    return contributions;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw new Error('Failed to fetch contributions.');
  }
};

// Function to fetch pull requests for the last 7 days
export const fetchPullRequests = async (token, username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const pullRequests = response.data.items.filter((pr) => {
      const prDate = new Date(pr.created_at);
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setDate(currentDate.getDate() - 7);

      return prDate >= pastDate && prDate <= currentDate;
    }).length;

    return { pullRequests };
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    throw new Error('Failed to fetch pull requests.');
  }
};

// Function to fetch contributions for the last month (4 weeks)
export const fetchMonthlyContributions = async (token, username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const pushEvents = response.data.filter(
      (event) => event.type === 'PushEvent'
    );

    console.log(pushEvents);

    const monthlyData = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 28); // Start date is 28 days ago (4 weeks)

    // Group contributions by week
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + i * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const weekContributions = pushEvents.filter((event) => {
        const eventDate = new Date(event.created_at);
        return eventDate >= weekStart && eventDate <= weekEnd;
      }).length;

      console.log(weekContributions);

      monthlyData.push({
        name: `Week ${i + 1}`,
        tasks: Math.floor(weekContributions / 2), // Example tasks, adjust as needed
        hours: weekContributions, // Using contributions as hours for simplicity
      });
    }

    return monthlyData;
  } catch (error) {
    console.error('Error fetching monthly contributions:', error);
    throw new Error('Failed to fetch monthly contributions.');
  }
};
