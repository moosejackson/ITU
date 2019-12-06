import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'

import './Header.css';

function Central() {
  return (
    <div className="centerBlock">
      <FontAwesomeIcon icon={faHome} /> Centrální sklad
    </div>
  )
}

export default Central;
