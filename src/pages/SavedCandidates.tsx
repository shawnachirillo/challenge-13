import { useEffect, useState } from 'react';

const SavedCandidates = () => {
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSaved(data);
  }, []);

  if (!saved.length) return <p>No candidates have been accepted yet.</p>;

  return (
    <div>
      <h2>Saved Candidates</h2>
      {saved.map((user, i) => (
        <div key={i}>
          <img src={user.avatar_url} alt="Avatar" width={100} />
          <h3>{user.name}</h3>
          <p>@{user.login}</p>
          <p>{user.location}</p>
          <p>{user.email}</p>
          <p>{user.company}</p>
          <a href={user.html_url} target="_blank">GitHub Profile</a>
        </div>
      ))}
    </div>
  );
};

export default SavedCandidates;
