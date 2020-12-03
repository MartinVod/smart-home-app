import {BrowserRouter as Router,Switch , Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddRoom from './components/AddRoom';
import React,{useState} from 'react';
import Room from './components/Room';
import Main from './components/Main';

function App() {

const [roomList, setRoomList] = useState([
  {id: '1',type: 'Bath room',name: 'Main Bath',color:'lightblue', appl: [{appName:'Water boiler',appState: false}]},
  {id: '2', type: 'Kitchen',name: 'Kitchen',color:'grey', appl: [{appName:'Lamp',appState: false},{appName:'Lamp',appState: false}]}
]);

/*---- add room function ----*/
const addRoom = (roomType,roomName,roomColor,isValid)=>{
  if(isValid){
  setRoomList([...roomList,{id: (parseInt(roomList[roomList.length-1].id)+1).toString(),type: roomType,name: roomName,color: roomColor, appl: []}]);
  }
}

/*---- routing all the rooms in the room list ----*/
const routeRooms = (room) =>{
  let pathName = '/room-'+room.id;
  return(
    <Route exact path={pathName} component={()=><Room room={room} addAppl={addApplience} toggleApp={toggleApp} />} />
  )
}

/*--------- adding a new applience to a room -----*/
const addApplience = (room, applienceName,toAdd) =>{
if(toAdd){
    let roomIndex = roomList.indexOf(room);
    console.log(roomIndex);
    room.appl.push({appName: applienceName,appState: false});
    let updatedRooms = roomList;
    updatedRooms[roomIndex] = room;
    setRoomList(updatedRooms);
  }else{
    alert('An error occured while adding the appliance');
  }
}

/*----- Toggle Appliance -----*/
const toggleApp = (room,appIndex)=>{
  let roomIndex = roomList.indexOf(room);
  let currentCondition = roomList[roomIndex].appl[appIndex].appState;
  if(currentCondition === true){
    roomList[roomIndex].appl[appIndex].appState = false;
  }
  else{
    roomList[roomIndex].appl[appIndex].appState = true;
  }
}

  return (
    <div className="App container">
      <Header /> 
        <Router>  
        
        <Switch>
        <div>
        <Route exact path='/' component={()=><Main add={addRoom} roomList={roomList} />} />
        <Route exact path='/add-room' component={()=><AddRoom add={addRoom}/>} />
        {roomList.map(routeRooms)}
        </div>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
