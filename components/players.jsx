"use client"
import { useState } from 'react'
import '@styles/globals.css'

const Players = () => {
    var gambler = {
        name: "賭徒",
        money: 1000,
    }
    var player1 = {
        Name:'whp',
        ID:1,
        motto: "Don't touch me",
        img: '/assets/whp.png',
        rating:2,
        now: 0 
    }
    var player2 = {
        Name:'winston',
        ID:2,
        motto: "Aren't you strong",
        img: '/assets/winston.png',
        rating:3.5,
        now:0
    }
    return(
        <>
        <div className = 'w-full h-auto mx-auto'>
            <div className = "flex place-content-evenly w-[80%] m-auto">
                <Player_card player = {player1} gambler={gambler}/>
                <Player_card player = {player2} gambler={gambler}/>
            </div>
        </div>
        </>
    )
}
const Player_card = ({ player ,gambler}) => {
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
                <div className = 'text-2xl'>賠率：&emsp;{player.rating}</div>
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