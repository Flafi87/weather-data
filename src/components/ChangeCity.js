import React from 'react';
import { connect } from 'react-redux';
import { changeCity } from '../actions/dataActions';

const ChangeCity = ({changeCity}) => {
    return (
        <div>
            <button onClick = {()=> changeCity('1125618','Brenna')}>Brenna</button>
            <button onClick = {()=> changeCity('71542','Kiskunmajsa')}>Kiskunmajsa</button>
        </div>
    )
}

export default connect(
   null, { changeCity },
  )(ChangeCity);
