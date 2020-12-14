import React,{useState} from 'react'
import {Link} from 'react-router-dom';



export default function AddRoom(props) {

   const [toAdd, setToAdd] = useState(false);
   const [roomName,setRoomName] = useState('');
   const [roomType,setRoomType] = useState('');
   const [roomColor,setRoomColor] = useState('');

   const showForm = ()=>{
    if(toAdd){   
    return(
        <div className='form-group'>
        <label className='sr-only'>Room Type</label>
        <select class="form-control" id='rmType' onChange={(e)=>{setRoomType(e.target.value)}}>
            <option selected disabled>Choose room type</option>
            <option>Bed room</option>
            <option>Bath room</option>
            <option>Kitchen</option>
        </select><br />
        
        <label className='sr-only'>Room Name</label>
        <input  className='form-control' id='rmName' type='text' placeholder='name' onChange={(e)=>{setRoomName(e.target.value)}} /><br />

        <label>Choose Color:</label>
        <input  className='form-control' id='rmClr' type='color' placeholder='color' onChange={(e)=>{setRoomColor(e.target.value)}} /><br />
    
        <Link to='/'><button className='btn btn-sm'>back</button></Link><Link to='/'><button className='btn btn-lg' onClick={()=>{
            let isValid=true;
            if(document.getElementById('rmType').value === 'Choose room type'){
                setToAdd(false);
                isValid = false;
                alert('An error occured while submiting the form');
            }else if(document.getElementById('rmName').value.length === 0){
                setToAdd(false);
                isValid=false;
                alert('An error occured while submiting the form');
            }
            else{
                setToAdd(false);
            }
            props.add(roomType,roomName,roomColor,isValid)
            }}>Add Room</button></Link>
        </div>
    )
        }else{
            return(
                <Link to='/add-room'><button className='btn btn-lg' onClick={()=>{setToAdd(true); return(showForm)}}>Click here to add new room</button></Link>
            )
        }
       
   }

    return (

        showForm()
        

    )
}
