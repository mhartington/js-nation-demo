import { useEffect, useState } from 'react'
import './App.css'

import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
import {registerPlugin} from "@capacitor/core";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

function App() {
  useEffect(() => {
    return () => {
      BackgroundGeolocation.removeWatcher({id: watchId})
    }
  }, [])

  const [loc, setLoc] = useState<{lat: number| null; long: number| null}>({lat: null, long: null})
  const [watchId, setWatchId] = useState('');
  const getLoc = async () => {
    const id = await BackgroundGeolocation.addWatcher(   {
        backgroundMessage: "Cancel to prevent battery drain.",
        backgroundTitle: "Tracking You.",
        requestPermissions: true,
        stale: false,
        distanceFilter: 50
    }, (postition, err)=> {
        if(err) {
          console.error(err);
        }
      if(postition) {
        setLoc({lat: postition.latitude, long: postition.longitude})
      }
    })
    setWatchId(id)
  }
  return (
    <>
      <h1>Cap + React</h1>
      <div className="card">
        <button onClick={getLoc}>
            Get Loc 
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <pre>
        {JSON.stringify(loc, null, 2)}
      </pre>
    </>
  )
}

export default App
