"use client"
import { useEffect, useState } from 'react';
import { fetchData } from './api';
import '@styles/globals.css'

const ALL = () => {
    const [gambler, setgambler] = useState([]);
    const [rating1, setrating1] = useState(0);
    const [rating2, setrating2] = useState(0);
    const [user_id, setuser_id] = useState('');
    
    var player1 = {
        name:'玩家右的左邊',
        ID:1,
        motto: "Don't touch me",
        img: '/assets/whp.png',
        now:0
    }
    var player2 = {
        name:'玩家左的右邊',
        ID:2,
        motto: "Aren't you strong",
        img: '/assets/winston.png',
        rating:3.5,
        now:0
    }
    useEffect(() => {
        fetchData(`users/${user_id}`)
        .then((result) => {
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

    const [inputValue1, setInputValue1] = useState(0);
    const [inputValue2, setInputValue2] = useState(0);
    const handleInputChange_id = (event) => {
        setuser_id(event.target.value);
    }
    const handleInputChange1 = (event) => {
        player1.now = parseInt(event.target.value);
        console.log(player1)
        setInputValue1(parseInt(event.target.value));
    }
    const handleInputChange2 = (event) => {
        player2.now = parseInt(event.target.value);
        setInputValue2(parseInt(event.target.value));
    }
    const handleButtonClick1 = (event) => {
        
        if(inputValue1< 0){
            alert("下注金額不可為負數");
            return;
        }
        if(inputValue1> gambler.money){
            alert("下注金額不可超過賭徒擁有金額");
            return;
        }
        console.log("dfs")
        console.log(inputValue1)
        console.log(gambler.money)
        fetchData(`bet/${gambler.id}/at_${player1.ID}/${inputValue1}`)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
        alert(`你下注了${inputValue1}元在${player1.name}身上`);
        
        fetchData(`users/${user_id}`)
        .then((result) => {
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
        
    }
    const handleButtonClick2 = (event) => {
        if(inputValue2 < 0){
            alert("下注金額不可為負數");
            return;
        }
        if(inputValue2 > gambler.money){
            alert("下注金額不可超過賭徒擁有金額");
            return;
        }
        fetchData(`bet/${gambler.id}/at_${player2.ID}/${inputValue2}`)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
        alert(`你下注了${inputValue2}元在${player2.name}身上`);
        fetchData(`users/${user_id}`)
        .then((result) => {
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
    }
    const refresh = (event) => {
        fetchData(`users/${user_id}`)
        .then((result) => {
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
    }
    return(
        <>
        <div className = "w-full m-auto">
            <div className = "w-[80%] my-4 py-8 bg-gray-300 mx-auto rounded-lg" >
                <ul className = 'mx-8 '>
                    <li>賭徒：<input className = 'w-[80%] border-black border' type="str" value={user_id} onChange={handleInputChange_id} /></li>
                    <li>金錢：{gambler.money}</li>
                    <button className = 'bg-gray-300 px-2 py-1 rounded-lg border-black border bg-[#A8D5CC]' onClick={refresh}>
                    刷新
                    </button>
                </ul>
            </div>
        </div>
        <div className = 'w-full h-auto mx-auto'>
            <div className = "place-content-evenly w-[100%] m-auto">
                <div className = 'w-[90%] p-8 m-auto mb-4 bg-[#EED5B7] rounded-lg'>
                    <div className = 'aspect-[19/8]'>
                        <img className ='m-auto h-full' src = '/assets/whp.png'/>
                    </div>
                    <div className = 'text-center'>
                        <div className = 'text-2xl'>玩家：{player1.name}</div>
                        <div className = 'text-2xl'>座右銘：{player1.motto}</div>
                        <div className = 'text-2xl'>賠率：&emsp;{rating1}</div>
                        <div className = 'text-2xl'>已下注：&emsp;{gambler.at_1}</div>
                        {/* {player.now} */}
                    </div>
                    <div className = 'text-2xl '>
                        金額：&emsp;
                        <input className = 'w-[40%] border-black border' type="number" value={inputValue1} onChange={handleInputChange1} />
                        &emsp;
                        <button className = 'bg-gray-300 px-2 py-1 rounded-lg border-black border' onClick={handleButtonClick1}>
                            下注
                        </button>
                    </div>
                </div>
                <div className = 'w-[90%] p-8 m-auto bg-[#EED5B7] rounded-lg'>
                    <div className = 'aspect-[19/8]'>
                        
                        <img className ='m-auto h-full' src = '/assets/winston.png'/>
                    </div>
                    <div className = 'text-center'>
                        <div className = 'text-2xl'>玩家：{player2.nmae}</div>
                        <div className = 'text-2xl'>座右銘：{player2.motto}</div>
                        <div className = 'text-2xl'>賠率：&emsp;{rating2}</div>
                        <div className = 'text-2xl'>已下注：&emsp;{gambler.at_2}</div>
                        {/* {player.now} */}
                    </div>
                    <div className = 'text-2xl '>
                        金額：&emsp;
                        <input className = 'w-[40%] border-black border' type="number" value={inputValue2} onChange={handleInputChange2} />
                        &emsp;
                        <button className = 'bg-gray-300 px-2 py-1 rounded-lg border-black border' onClick={handleButtonClick2}>
                            下注
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
// const Player_card = ({ player ,gambler,rating,bid}) => {

    
//     const handleButtonClick = (event) => {
//         if(player.now < 0){
//             alert("下注金額不可為負數");
//             return;
//         }
//         if(player.now > gambler.money){
//             alert("下注金額不可超過賭徒擁有金額");
//             return;
//         }
//         fetchData(`bet/${gambler.id}/at_${player.ID}/${player.now}`)
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//         alert(`你下注了${player.now}元在${player.name}身上`);
//     }
//     return(
        
//     )
// }
export default ALL