"use client"
import { useEffect, useState } from 'react';
import { fetchData } from './api';
import '@styles/globals.css'

const info = () => {
    const [gambler, setgambler] = useState([]);
    const user_id = '1111';
    useEffect(() => {
        fetchData(`users/${user_id}`)
        .then((result) => {
            setgambler(result);
        })
        .catch((error) => {
            console.error(error);
        });
        
    }, []);
    return(
        <div className = "w-full m-auto">
            <div className = "w-[80%] my-4 py-8 bg-gray-300 mx-auto rounded-lg" >
                <ul className = 'mx-8 '>
                    <li>賭徒：{gambler.name}</li>
                    <li>金錢：{gambler.money}</li>
                </ul>
            </div>
        </div>
    )
}
export default info;
