import React from 'react'
import './../App.css';

import AddRoom from './AddRoom';
import Rooms from './Rooms';

export default function Main(props) {
    return (
        <div>
           <Rooms rooms={props.roomList} />
            <AddRoom add={props.add} />
        </div>
    )
}
