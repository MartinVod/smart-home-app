
import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import lamp from './../imgs/lamp.png';
import stereo from './../imgs/stereo.png';
import ac from './../imgs/ac.png';
import heater from './../imgs/heater.png';
import './Room.css';
import './../App.css'

export default function Room(props) {

    const [formFlag,setFormFlag] = useState(false);
    const [btnStr, setBtnStr] = useState('Add another applience');
    const [showForm, setShowForm] = useState('none');
    const [errorStr,setErrorStr] = useState('');
    const [toAdd, setToAdd] = useState(false);
    const [roomURL, setRoomURL] = useState('/room-'+props.room.id.toString());


    /*------show all the appliances in the room------*/
    /*------ match img to appliance-----*/
    const showAppl = (appl,ind) =>{
        let imgPath;
        if(appl.appName === 'Stereo system'){
            imgPath=stereo;
        }else if(appl.appName === 'Air conditioner'){
            imgPath=ac;
        }else if(appl.appName === 'Water boiler'){
            imgPath=heater;
        }else{
            imgPath = lamp;
        }

        return(
            <li className='col-md-3'>
            <div className='app-box'>
                <img src={imgPath} alt='' style={appl.appState ? {backgroundColor: 'lightgreen'} : {backgroundColor: 'red'}}/>
                    <div className='app-box-content'>
                    <div className='app-overlay-img'>
                        <img src={imgPath} alt='' style={appl.appState ? {backgroundColor: 'lightgreen'} : {backgroundColor: 'red'}}/>
                    </div>
                    <div className='app-inner-content'>
                        <h3 className='app-title'>{appl.appName}</h3>
                        <span>Status: {appl.sppState ? 'On' : 'Off'}  </span><span>  <Link ><button onClick={()=>{props.toggleApp(props.room,props.room.appl.indexOf(appl))}}>Turn On/Off</button></Link></span>
                    </div>
                </div>
                <span className='app-delete'><Link to={roomURL} className='btn' onClick={()=>{props.deleteAppl(appl.id,props.room.id,appl)}}> Delete </Link></span>
            </div>
        </li>
        )
    }




/*------toggle form with flag-----*/
const toggleForm = () =>{
    if(!formFlag){
        setShowForm('block');
        setBtnStr('hide');
        setFormFlag(true);
    }
    else{
        setShowForm('none');
        setBtnStr('Add another applience');
        setFormFlag(false);
    }
}

/*------- check if the chosen appliance is valid-----*/
const isValid = (element) =>{
    let isStereo = false;
        for(let i=0; i<props.room.appl.length;i++){
            if(props.room.appl[i].appName === 'Stereo system'){
                isStereo=true;
                setToAdd(false);
            }
        }
    if(props.room.appl.length === 5){
        element.target.className = 'form-control is-invalid';
        setErrorStr('Each room must contain maximum of 5 appliances');
        setToAdd(false);
    }else if(element.target.value === 'Stereo system' && isStereo === true){
        element.target.className = 'form-control is-invalid';
        setErrorStr('Maximum of 1 stereo system per room');
        setToAdd(false);
    }else if(element.target.value === 'Water boiler' && props.room.type !== 'Bath room'){
        element.target.className = 'form-control is-invalid';
        setErrorStr('Water boiler belongs only to bathroom');
        setToAdd(false);
    }
    else{
        element.target.className = 'form-control is-valid';
        setErrorStr('We are good to go!');
        setToAdd(true);
    }
}


    return (
    <div className='showRoomDiv'>
        <h1>Room name: {props.room.name} <button class="btn btn-danger" onClick={() =>{props.deleteRoom(props.room.id)}}><Link  to='/'>Delete this Room</Link></button></h1>
        <h2>Room type: {props.room.type}</h2>
        <ul className='row' id='appRow'>
           
            {props.room.appl.map(showAppl)}
        </ul>
        <div className='form-group' style={{display: showForm}}>
        <hr />
            <h6>Please choose appliance</h6>
            <select class="form-control" id='applType' onChange={isValid}>
                <option selected disabled>Choose applience</option>
                <option>Stereo system</option>
                <option>Air conditioner</option>
                <option>Water boiler</option>
                <option>Lamp</option>
            </select>
            <small className='' style={toAdd ? {color: 'white'} : {color: 'red'}}>{errorStr}</small><br />
            <Link to={roomURL} ><button type='submit' className='btn btn-md red' onClick={()=>{props.addAppl(props.room,document.getElementById('applType').value,toAdd)}}>Submit applience</button></Link>
        </div>
            <Link to='/' ><button className='btn btn-sm'>back</button></Link><button type='submit' className='btn red' onClick={toggleForm}>{btnStr}</button>
        
        
    </div>
    )
}
