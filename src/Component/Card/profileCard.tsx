import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SearchForm from '../searchForm';
import { color, fontStyle } from '@mui/system';
import { blue, red, yellow } from '@mui/material/colors';
import api from '../../Service/api';
import LolRecordCard from './lolRecordCard';

// 사용자 정보를 나타내는 인터페이스
interface SummonerData {
  name: string;
  summonerLevel: number;
}

// 사용자의 랭크 정보를 나타내는 인터페이스
interface SummonerRank {
  tier: string;
  rank: string;
  wins: number;
  losses: number;
}

interface RecordRoomId{
  roomId : string[];
}

interface RecordGame{
  info : {};
  metadata:{
    participants:[];
  };
}

interface myTeam{
  team : string[];
}
interface enemyTeam{
  enemy: string[]
}






// 사용자 정보와 랭크 정보를 함께 담는 객체
interface SummonerInfo {
  summonerData: SummonerData;
  summonerRank: SummonerRank;
  
}

interface GameInfo{
  recordRoomId: RecordRoomId;
  recordGame : RecordGame;
 
}


// 카드 컴포넌트
function OutlinedCard({ summonerData, summonerRank }: SummonerInfo) {
  let winrate = (summonerRank.wins / (summonerRank.wins + summonerRank.losses) * 100) .toFixed(2)
  let winratefloat = parseFloat(winrate);
  const winrateStyle: React.CSSProperties = winratefloat >= 50 ? { color: red[500] } : {color: blue[500] };
  

  return (
    <Box sx={{ minWidth: 250, maxWidth: 'fit-content', marginBottom: '16px' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
            {summonerData.name} 
          </Typography>
          <Typography variant="h6" component="div">
            Lv: {summonerData.summonerLevel}
          </Typography>
          <Typography variant="body1">
            티어: {summonerRank.tier} {summonerRank.rank}
            <br />
            승리: {summonerRank.wins} 패배: {summonerRank.losses}
          </Typography>
          <Typography variant="body1" >
             승률: <span style={winrateStyle}>{winrate}%</span>
             
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

// 애플리케이션 컴포넌트
function App() {
  // 사용자 정보와 랭크 정보를 저장할 상태
  const [summonerList, setSummonerList] = useState<SummonerInfo[]>([]);
  const [matchUserList , setMatchUserList] = useState<string[]>([]);
  const [matchdata, setMatchData] = useState<{}>([]);


  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = async (summonerName: any) => {
    const apiKey = 'RGAPI-6e031de4-dc47-4b0e-8643-00408acb44cc';

    try {
      // 사용자 정보 API 호출
      const userData = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName.name}?api_key=${apiKey}`
      );

      // 랭크 정보 API 호출
      const userRank = await axios.get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userData.data.id}?api_key=${apiKey}`
      );
      
      const userRoomList = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerName.puuid}/ids?start=0&count=20&api_key=${apiKey}`
      )
      const userTeam = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${userRoomList.data[0]}?api_key=${apiKey}`
      )
      
      const GameUserUuid = userTeam.data.metadata.participants
        
      const fetchGameUserInfoPromises = GameUserUuid.map(async (uuid: string) => {
        const teamInfo = await axios.get(
          `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${uuid}?api_key=${apiKey}`
        );
        return teamInfo.data.name;
      });
      const fetchedGameUserInfo = await Promise.all(fetchGameUserInfoPromises)

      



      // 사용자 정보와 랭크 정보를 합쳐서 SummonerInfo 객체 생성
      const summonerInfo: SummonerInfo = {
        summonerData: userData.data,
        summonerRank: userRank.data[0],
      };

      const gameInfo: GameInfo = {
        recordRoomId: userRoomList.data,
        recordGame: userTeam.data,
        
        

      }
      const matchUserList = fetchedGameUserInfo;
      const gamedata = gameInfo.recordGame;

      setMatchData(gameInfo);

      
      console.log(gameInfo);
     
      
      

      setMatchUserList(matchUserList);
      

      // summonerList에 새로운 사용자 정보 추가
      setSummonerList((prevSummonerList) => [...prevSummonerList, summonerInfo]);
    } catch (error) {
      
      console.error('Error fetching summoner data:', error);
    }
  };

  return (
    <div>
      <h1>범인찾기</h1>
      <SearchForm onSearch={handleSearch} />
      {/* summonerList를 순회하며 각 사용자 정보에 대한 카드 생성 */}
      {summonerList.map((summonerInfo, index) => (
        <div style={{ display: 'flex', gap: '16px' }}>
        <OutlinedCard key={index} {...summonerInfo} />
        <LolRecordCard key={index} matchUser={matchUserList} gamedata={matchdata}/>
        </div>
      ))}
    </div>
  );
}

export default App;