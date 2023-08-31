// SearchForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface SearchFormProps {
  onSearch: (data: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [summonerName, setSummonerName] = useState('');
  const apikey = 'RGAPI-6e031de4-dc47-4b0e-8643-00408acb44cc';
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apikey}`,
        
      );
      onSearch(response.data);
      setSummonerName('')
    } catch (error) {
        setSummonerName('')
      console.error('Error fetching summoner data:', error);
      
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="소환사의 이름을 입력해주세요"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;