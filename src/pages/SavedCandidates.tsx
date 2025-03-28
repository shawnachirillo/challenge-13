import { useEffect, useState } from 'react';
import { Candidate } from '../types';
import CandidateCard from './candidatecard';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(stored);
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <CandidateCard key={index} candidate={candidate} />
        ))
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
