import * as THREE from 'three'
import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useLoader, useThree } from 'react-three-fiber'

import Controls from './components/Controls'
import Environment from './components/Environment'
import GFCMachine from './components/GFCMachine'
import Effects from './components/Effects'
import UI from './components/UI';
import UISecondary from './components/UISecondary';
import Loading from './components/Loading';

import './styles.css'

const PropellerSound = ({ url }) => {
  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    sound.current.play()
    camera.add(listener)
    return () => {
      if(sound.current.isPlaying) {
        sound.current.stop()
      }
      camera.remove(listener);
    }
  }, [])
  return <positionalAudio ref={sound} args={[listener]} />
}

function App() {
  // Controls disable pointerevents on movement to save some CPU cost
  //const [active, set] = useState(false);
  const [allowSound, setAllowSound] = useState(false);
  const [selections, setSelections] = useState([])
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadUI, setLoadUI] = useState(false);

  useEffect(() => {
    if(modelLoaded){
      setTimeout(() => {
        setLoadUI(true)
      }, 500)
    }
  }, [modelLoaded])

  const toggleSound = () => {
    setAllowSound(c => !c);
  }

  const setNewSelection = (id) => {
    //only update if this is a new value
    if(selections.includes(id)){
      return;
    }

    let updatedSelections = selections;

    if (selections.length === 2){
      //keep last selection, make it first
      updatedSelections = selections.slice(1, 2);
    }

    //add new last selection
    setSelections(updatedSelections.concat([id]));
    
  }

  return (
    <div className="App">
      
      {/*Loading模型圈圈*/}
      {!loadUI && <Loading modelLoaded={modelLoaded}/>}
      
      {/*主要的白色字體UI*/}
      {loadUI && <UI selections={selections}/>}
      
      {/*下面的 sound按鈕, About, Drag to orbit*/}
      {loadUI && <UISecondary allowSound={allowSound} toggleSound={toggleSound}/>}

      <div className="App__canvas">
        
        <Canvas
          concurrent
          noEvents={false}
          pixelRatio={window.devicePixelRatio}
          camera={{ position: [0, 0, 2.5], fov: 69 }}
          gl={{ antialias: true }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.outputEncoding = THREE.sRGBEncoding
            //scene.background = new THREE.Color('#373740')
          }}>
          
          <ambientLight intensity={0.33}/>
          
          {/*讓模型可以Orbit*/}
          <Controls/>          
          
          <Suspense fallback={null}>
            <Environment />
            <GFCMachine 
              selections={selections} 
              setNewSelection={setNewSelection} 
              allowSound={allowSound}
              position={[0, 0.1, 0]} 
              setModelLoaded = {setModelLoaded}
            />
            <Effects />
          </Suspense>
          
          {/* Doesn't work in Safari! */}
          {allowSound && 
          <Suspense fallback={null}>
            <PropellerSound url="audio/propeller.ogg"/>
          </Suspense>
          }
        
        </Canvas>
      </div>
    
    </div>
  )
}

export default App;
