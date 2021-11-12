import React, { useState, useEffect,useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import {  AppBar, Typography,Button  } from '@material-ui/core';
import { getAllLogs  } from './api/data.js';
import LogEntryForm from './LogEntryForm';
import Post from './Post';
import {auth} from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import  {LoginContext} from './App';
const useStyles= makeStyles({
  appBar: {
    borderRadius: '15',
    margin: '5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
});
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const {account} = useContext(LoginContext);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28.65381,
    longitude: 77.22897,
    zoom: 3
  });

  
  
  
  const getEntries = async () => {
    const logEntries = await getAllLogs(account.email);
    if(logEntries)   
    setLogEntries(logEntries.data);
  };

  useEffect(() => {
    getEntries();
  });

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;

    setAddEntryLocation({
      latitude,
      longitude,
    });
    console.log(addEntryLocation);
  };
  const signout =  () => {
    auth.signOut().then(function() {
        history.push(`/login`);
      }).catch(function(error) {
        console.log(error);
      });
 
}
  return (
    <>
   
    <AppBar className={classes.appBar}  position="static" color="inherit">
    <Typography lassName={classes.heading} variant="h2" align="center">Travel Log</Typography>
    <img className={classes.image}  src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/PART_1_and_2/client/src/images/memories.png" alt="icon" height="60" />
    <Button onClick={() => signout()} variant="contained" color="white">Logout</Button>
  </AppBar>
    <ReactMapGL
      {...viewport}
mapStyle="mapbox://styles/nihal183/cktzi1llk3k6d17nwiyzlbd6x"
mapboxApiAccessToken="pk.eyJ1IjoibmloYWwxODMiLCJhIjoiY2t0dWc5cmZiMWExcTJvcWVjYnIzd2p4MSJ9.Ls0pSJt5cktZ9ve_GneAHg" 
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  // ...showPopup,
                  [entry._id]: true,
                })}
              >
                <svg
                  className="marker yellow"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <Post entry={entry}/>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
              <div className="popup">
              <LogEntryForm  location={addEntryLocation} />
            </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
    </>
  );
}

export default Home;




 


































           
     // mapboxApiAccessToken="pk.eyJ1IjoibmloYWwxODMiLCJhIjoiY2t0dWc5cmZiMWExcTJvcWVjYnIzd2p4MSJ9.Ls0pSJt5cktZ9ve_GneAHg" 