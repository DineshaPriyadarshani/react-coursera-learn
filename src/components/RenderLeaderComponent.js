import React from 'react';
import { CardImg } from 'reactstrap';

function RenderLeader(props) {
    if(props.selectedLeader != null) {
        return(
            <div className='container'>
                <div className='row mb-5'>
                    <div className='col-2'>
                        <CardImg src={props.selectedLeader.image}></CardImg>
                    </div>
                    <div className='col-10 pl-5'>
                        <h3>{props.selectedLeader.name}</h3>
                        <p>{props.selectedLeader.designation}</p>
                        <p>{props.selectedLeader.description}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default RenderLeader;