import { useState } from "react"

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const toppings = [
    "bred.PNG",
    "bacon.PNG",
    "chemse.PNG",
    "lettuce.PNG",
    "mati sauce.PNG",
    "mayo.PNG",
    "mustard.PNG",
    "pickles.PNG",
    "salami.PNG",
    "tomato.PNG",
    "ham.PNG"
  ];

  const [currentTopping, setCurrentTopping] = useState(0);
  const [mySAMMICH, setMySAMMICH] = useState([]);

  const handleNext = () => {
    currentTopping < toppings.length - 1 ? 
    setCurrentTopping(currentTopping + 1) :
    setCurrentTopping(0);
  }

    const handlePrev = () => {
    currentTopping !== 0 ? 
    setCurrentTopping(currentTopping - 1) :
    setCurrentTopping(toppings.length - 1);
  }

  const handleAdd =  () => {
    setMySAMMICH([...mySAMMICH, toppings[currentTopping]]);
  }

  return (
    <>
    <h1>MAKE YOUR OWN SANDWICH!!</h1>
     <div style={{
      height: '600px'
     }}>
      {mySAMMICH.map((layer, index) => {
        const position = 200 - (index * 10);
        return <img src={layer} 
          style={{
            height:'600px',
            position:'fixed',
            left: '150px',
            top: `${position}px`
          }}
        ></img>
      })}
      
     </div>
     <div style={{
      display:"flex"
     }}>
      <button style={{
        height:"50px"
      }}
      onClick={handlePrev}
      >prev</button>
      {<img src={toppings[currentTopping]} 
      style={{
        height:'600px'
      }}
      ></img>}
      <button style={{
        height:"50px"
      }}
      onClick={handleNext}
      >
        next</button>
     </div>
     <button onClick={handleAdd}>ADD ME</button>
    </>
  )
}

export default App
