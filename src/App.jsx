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
  {id: 1,type: 'Bath room',name: 'Main Bath',color:'lightblue', appl: [{id: 1,appName:'Water boiler',appState: false}]},
  {id: 2, type: 'Kitchen',name: 'Kitchen',color:'grey', appl: [{id: 1,appName:'Lamp',appState: false},{id: 2,appName:'Lamp',appState: false}]}
]);

/*-----setting maximum id for new array input -------*/
const findId = (arr) =>{
  if(arr.length === 0){
      return 1;
    }else{
      let newArr = arr.sort((a,b)=>{return a.id - b.id});
      return(newArr[newArr.length-1].id+1);
    }
  }

/*---- add room function ----*/
const addRoom = (roomType,roomName,roomColor,isValid)=>{
  if(isValid){
  setRoomList([...roomList,{id: findId(roomList) ,type: roomType,name: roomName,color: roomColor, appl: []}]);
  }
}

/*---- routing all the rooms in the room list ----*/
const routeRooms = (room) =>{
  let pathName = '/room-'+(room.id).toString();
  return(
    <Route exact path={pathName} component={()=><Room room={room} addAppl={addApplience} toggleApp={toggleApp} deleteRoom={deleteRoom} deleteAppl={deleteAppl}/>} />
  )
}

/*--------- adding a new applience to a room -----*/
const addApplience = (room, applienceName,toAdd) =>{
if(toAdd){
    let roomIndex = roomList.indexOf(room);
    room.appl.push({id: findId(room.appl) ,appName: applienceName,appState: false});
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

/*------------- delete room -----------------*/
const deleteRoom = (roomid)=>{
  let index = roomList.findIndex((room)=>{
    return(room.id === roomid)
  });
  let roomArr = roomList;
  roomArr.splice(index,1);
  setRoomList(roomArr);
}

/*----delete appliance -------*/
const deleteAppl = (appIndex,roomIndex,app)=>{
  let updatedRoomApp = roomList.filter((room)=>room.id === roomIndex);
  console.log(updatedRoomApp)
  console.log(app)
  let appliancePosition = updatedRoomApp[0].appl.indexOf(app);
  updatedRoomApp[0].appl.splice(appliancePosition,1);
  let currentRooms = roomList;
  currentRooms.splice(roomIndex,1,updatedRoomApp[0]);
  setRoomList(currentRooms);
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
