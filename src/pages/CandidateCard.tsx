import { Candidate } from '../types';

interface Props {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: Props) => {
  return (
    <div className="candidate-card">
      <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width={100} />
      <h2>{candidate.name}</h2>
      <p><strong>Username:</strong> {candidate.login}</p>
      <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
      <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
      <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        View GitHub Profile
      </a>
    </div>
  );
};

export default CandidateCard;
