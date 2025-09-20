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
          width: '100%',
          height: '50vh'
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
          display: 'flex',
          height: '50vh',
          width: '100vw',
          flexDirection: 'column'
        }}>
          <div
            style={{
              width: '100%',
              overflow: 'hidden'
            }}>
              {toppings.map((topping, index) => {
                const distance = Math.abs(currentTopping-index);
                return (
                  <img
                    src={topping}
                    style={{
                      width: '50vw',
                      height: '50vh',
                      objectFit: 'contain',
                      position: 'fixed',
                      left: '50vw',
                      translate: `${((index - currentTopping)*50)-50}%`,
                      zIndex: `${toppings.length-Math.abs(currentTopping-index)}`,
                      opacity: 1-distance*.5,
                      transition: 'all 0.5s ease',
                      // rotate: `y ${distance*45}deg`,
                      scale: 1-distance*.3,
                      filter: 'drop-shadow(0 12px 24px #000000)'
                    }}
                    // onMouseDown={index != currentTopping ? (index<currentTopping?handlePrev:handleNext) : null}
                ></img>
                )
              })}
          </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '10vh',
                position: 'fixed',
                bottom: 0,
                justifyContent: 'space-around',
                alignItems: 'center',
                zIndex: 1000
              }}>
                <button
                  className='control-button'
                  onMouseDown={handlePrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
                </button>
                <button
                  className='control-button'
                  onMouseDown={handleAdd}>
                  <svg style={{scale: 1.5}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>
                  </button>
                <button
                  className='control-button'
                  onMouseDown={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                  </button>
            </div>
      </div>
    </>
  )
}

export default App
