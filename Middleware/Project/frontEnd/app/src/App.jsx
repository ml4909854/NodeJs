import React, { useEffect, useState } from 'react'

const App = () => {
const [data , setData] = useState("")

  useEffect(()=>{

    async function fetchData(){
      let response = await fetch("http://localhost:5000/users")
      const outcome = await response.json()
      setData(outcome.message)
    }
    fetchData()
  },[])
 


  return (
    <div>
{data}
    </div>
  )
}

export default App