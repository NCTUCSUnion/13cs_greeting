"use client"
import { useEffect, useState } from 'react';
import { fetchData } from './api';
import '@styles/globals.css'

const Players = () => {
    const [gambler, setgambler] = useState([]);
    const [rating1, setrating1] = useState(0);
    const [rating2, setrating2] = useState(0);
    const user_id = '1111';
    var player1 = {
        Name:'whp',
        ID:1,
        motto: "Don't touch me",
        img: '/assets/whp.png',
    }
    var player2 = {
        Name:'winston',
        ID:2,
        motto: "Aren't you strong",
        img: '/assets/winston.png',
        rating:3.5,
        now:0
    }
    useEffect(() => {
        // console.log('+++++')
        fetchData(`users/${user_id}`)
        .then((result) => {
            // 在这里处理从FastAPI获取的数据
            // console.log('-----')
            // console.log(result);
            setgambler(result);
        })
        .catch((error) => {
            console.error(error);
        });
        fetchData(`total_bet_money`)
        .then((result) => {
            setrating1(Math.round((result[0]+result[1])/result[0]*100)/100);
            setrating2(Math.round((result[0]+result[1])/result[1]*100)/100);
            console.log(result)
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);
    return(
        <>
        <div className = 'w-full h-auto mx-auto'>
            <div className = "flex place-content-evenly w-[80%] m-auto">
                <Player_card player = {player1} gambler={gambler} rating = {rating1} bid = {gambler.at_1} />
                <Player_card player = {player2} gambler={gambler} rating = {rating2} bid = {gambler.at_2}/>
            </div>
        </div>
        </>
    )
}
const Player_card = ({ player ,gambler,rating,bid}) => {
    const [inputValue, setInputValue] = useState(0);

    const handleInputChange = (event) => {
        player.now = event.target.value;
        setInputValue(event.target.value);
    }
    const handleButtonClick = (event) => {
        if(player.now < 0){
            alert("下注金額不可為負數");
            return;
        }
        if(player.now > gambler.money){
            alert("下注金額不可超過賭徒擁有金額");
            return;
        }
        fetchData(`bet/${gambler.user_id}/at_${player.ID}/${player.now}`)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
        alert(`你下注了${player.now}元在${player.Name}身上`);
    }
    return(
        <div className = 'w-[40%] p-8 m-4 bg-[#EED5B7] rounded-lg'>
            <div className = 'aspect-[19/8]'>
                <img className ='m-auto h-full' src = {player.img}/>
            </div>
            <div className = 'text-center'>
                <div className = 'text-2xl'>玩家：{player.ID}:&emsp;{player.Name}</div>
                <div className = 'text-2xl'>座右銘：&emsp;{player.motto}</div>
                <div className = 'text-2xl'>賠率：&emsp;{rating}</div>
                <div className = 'text-2xl'>已下注：&emsp;{bid}</div>
                {/* {player.now} */}
            </div>
            <div className = 'text-2xl '>
                金額：&emsp;
                <input className = 'w-[40%] border-black border' type="number" value={inputValue} onChange={handleInputChange} />
                &emsp;
                <button className = 'bg-gray-300 px-2 py-1 rounded-lg border-black border' onClick={handleButtonClick}>
                    下注
                </button>
            </div>
        </div>
    )
}
export default Players