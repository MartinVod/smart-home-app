import React from 'react'
import {Link} from 'react-router-dom';
import './Rooms.css';
import kitchen from './../imgs/kitchen.png';
import bathroom from './../imgs/bathroom.png';
import bedroom from './../imgs/bedroom.png'

export default function Rooms(props) {



    const appList = (app) => {
        return(
            <li className='roomAppli'>{app.appName}</li>
        )
    }

    const showRooms = (room) =>{
                /*------ match img to room-----*/
                
                    let imgPath;
                    if(room.type === 'Bed room'){
                        imgPath=bedroom;
                    }else if(room.type === 'Bath room'){
                        imgPath=bathroom;
                    }else{
                        imgPath = kitchen;
                    }

        let roomid = '/room-'+room.id.toString();
            return(
                <div className='col-md-3' >
                    <div className='roomBox' style={{backgroundColor: room.color}}>
                        <div className='room-content'>
                            <div className='room-icon'>
                                <img src={imgPath} alt='' />
                            </div>
                            <h3 className='room-title'>{room.name} </h3>
                            <ul className='room-description'>
                            {room.appl.map(appList)}
                            </ul>
                        </div>
                        <Link to={roomid}><button className='goToRoom'>Go to room #+{room.id}</button></Link>
                    </div>
                </div>
            )
        }
      


    return (
        <div className='row roomsDiv'>
            {props.rooms.map(showRooms)}
        </div>
    )
}
