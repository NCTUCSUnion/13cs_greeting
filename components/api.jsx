// api.js
const BASE_URL = 'http://localhost:8000'; // FastAPI服务器的地址

export const fetchData = async (endpoint) => {
  console.log(`${BASE_URL}/${endpoint}`)
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  console.log(response)
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
  return response.json();
};