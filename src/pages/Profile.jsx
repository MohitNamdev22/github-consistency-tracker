import React, { useEffect, useState } from 'react';
import { fetchGitHubContributions } from '../api/githubApi';

const Profile = ({ username }) => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const getContributions = async () => {
      const data = await fetchGitHubContributions(username);
      setContributions(data);
    };
    getContributions();
  }, [username]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Your Profile</h1>
      <div className="bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-xl text-white">GitHub Contributions</h2>
        <ul className="list-disc pl-5 mt-2">
          {contributions.length > 0 ? (
            contributions.map((repo) => (
              <li key={repo.id} className="text-gray-300">
                {repo.name} - {repo.stargazers_count} Stars
              </li>
            ))
          ) : (
            <li className="text-gray-400">No contributions found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
