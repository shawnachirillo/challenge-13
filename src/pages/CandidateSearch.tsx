import { useEffect, useState } from 'react';
import { searchGithubUser, searchGithub } from '../api/API';
import { Candidate } from '../types';
import CandidateCard from './candidatecard'; 
import { BiSearch } from 'react-icons/bi';

const CandidateSearch = () => {
  // const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [results, setResults] = useState<Candidate[]>([]);
const [currentUser, setCurrentUser] = useState<Candidate | null>(null);
const [currentIndex, setCurrentIndex] = useState<number>(0);

  const loadCandidate = async () => {
    const data= await searchGithub();
    setResults(data);
    if (data.length> 0){
      await searchForSpecificUser(data[0].login);
    }
  //   const next = await searchGithubUser('defaultUsername');
  //   setCandidate(next);
  };

const searchForSpecificUser = async (username: string) => {
  const user = await searchGithubUser(username);
  setCurrentUser(user);
};


  useEffect(() => {
    loadCandidateList();
  }, []);

  const loadNextCandidate = async (newIndex:number) => {
    if (newIndex < results.length){
      const nextUsername= results[newIndex].login; {
        await searchForSpecificUser(nextUsername);
        setCurrentIndex(newIndex);
      }else{
        setCurrentUser(null);
      }
    };

  const acceptCandidate = () => {
    if (currentUser){
      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...saved, currentUser]));
      loadNextCandidate(currentIndex + 1);
    }


  const rejectCandidate = () => {
    loadNextCandidate(currentIndex + 1);
  };

  if (!currentUser) {
    return<p>Sorry, no more candidates to review.</p>
  }

  return (
    <div>
      <CandidateCard candidate={currentUser} />
      <div>


      <button onClick={acceptCandidate}>+</button>
      <button onClick={rejectCandidate}>-</button>
    </div>
    </div>
  );
};

export default CandidateSearch;
