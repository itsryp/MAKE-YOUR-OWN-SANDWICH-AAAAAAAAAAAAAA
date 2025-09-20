import { useState } from 'react'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const toppings = [
    'bred.PNG',
    'bacon.PNG',
    'chemse.PNG',
    'lettuce.PNG',
    'mati sauce.PNG',
    'mayo.PNG',
    'mustard.PNG',
    'pickles.PNG',
    'salami.PNG',
    'tomato.PNG',
    'ham.PNG'
  ]

  const [currentTopping, setCurrentTopping] = useState(0)
  const [mySAMMICH, setMySAMMICH] = useState([])

  const handleNext = () => {
    currentTopping < toppings.length - 1
      ? setCurrentTopping(currentTopping + 1)
      : setCurrentTopping(0)
  }

  const handlePrev = () => {
    currentTopping !== 0
      ? setCurrentTopping(currentTopping - 1)
      : setCurrentTopping(toppings.length - 1)
  }

  const handleAdd = () => {
    setMySAMMICH([...mySAMMICH, toppings[currentTopping]])
  }

  return (
    <>
      <h1>MAKE YOUR OWN SANDWICH!!</h1>
      <div
        style={{
          height: '600px'
        }}
      >
        {mySAMMICH.map((layer, index) => {
          const position = 200 - index * 10
          return (
            <img
              src={layer}
              style={{
                height: '40vh',
                position: 'fixed',
                left: '50vw',
                translate: '-50%',
                top: `${position}px`
              }}
            ></img>
          )
        })}
      </div>
      <div
        style={{
          display: 'flex'
        }}>
        {
          <div
            style={{
              width: '90vw',
              display: 'flex',
              overflow: 'hidden',
              justifyContent: 'center'
            }}>
            <img
              src={toppings[currentTopping - 1 < 0 ? toppings.length - 1 : currentTopping - 1]}

              onMouseDown={handlePrev}
              className="adjacentTopping"
            ></img>
            <img
              src={toppings[currentTopping]}
              style={{
                height: '40vh',
                zIndex: 2,
                width: '50%',
                objectFit: 'contain'
              }}
              onClick={handleAdd}
            ></img>
            <img
              src={toppings[(currentTopping + 1) % toppings.length]}
              onMouseDown={handleNext}
              className="adjacentTopping"
            ></img>
          </div>
        }
      </div>
    </>
  )
}

export default App
