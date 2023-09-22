import "@styles/globals.css"


const Navbar = () => {
    return (
        <div className="hidden md:block z-50 fixed w-full">
        <div className="w-full h-14 flex justify-between items-center px-[2%] bg-gray-200  ">
          <div className="text-xl font-bold  flex items-center h-full">
            <img

              className="object-contain mat h-1/2 "

              src="/assets/next.svg"
              alt="logo"
            />
            <div className="ml-4 font-normal text-base hackathon_title ">CS Union 14</div>
          </div>

          <ul className="flex items-center max-h-10">
            <li className="w-auto ml-2 bg-[#A8D5CC] text-white px-4 py-1 font-bold rounded-2xl">
              <a href="https://docs.google.com/forms/d/1wqN2bF9rWR0sOVBpFUiP0Q75hMQNMbY6le3kFZDslVI/edit" target="_blank">
                登入
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  export default Navbar