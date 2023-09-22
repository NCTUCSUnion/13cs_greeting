const info = () => {
    const gambler = {
        name: "賭徒",
        money: 1000,
    }
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
