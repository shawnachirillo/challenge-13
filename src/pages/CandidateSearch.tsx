import { useState, useEffect } from 'react';
import { getGitHubUsers } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getGitHubUsers();
      setCandidates(data);
    }
    fetchUsers();
  }, []);

  const handleAccept = () => {
    const candidate = candidates[currentIndex];
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    saved.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
    setCurrentIndex(currentIndex + 1);
  };

  const handleReject = () => {
    setCurrentIndex(currentIndex + 1);
  };

  if (!candidates.length) return <p>Loading...</p>;

  if (currentIndex >= candidates.length) return <p>No more candidates available.</p>;

  const user = candidates[currentIndex];

  return (
    <div>
      <img src={user.avatar_url} alt="Avatar" width={100} />
      <h2>{user.name}</h2>
      <p>@{user.login}</p>
      <p>{user.location}</p>
      <p>{user.email}</p>
      <p>{user.company}</p>
      <a href={user.html_url} target="_blank">GitHub Profile</a>
      <br />
      <button onClick={handleAccept}>+</button>
      <button onClick={handleReject}>-</button>
    </div>
  );
};

export default CandidateSearch;
