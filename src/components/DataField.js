import React from 'react';
import PropTypes from 'prop-types';
/**
 * @param  {number} data
 * @param  {string} text
 * @param  {string} unit
 * @param  {string} color
 */

const DataField = ({
  data, text, unit, onClick, additionalClass,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div className={`data ${additionalClass}`} onClick={onClick} role="button" tabIndex={0} onKeyPress={handleKeyPress}>
      <div>{text}</div>
      <div>
        {data}
        {unit}
      </div>
    </div>
  );
};

DataField.defaultProps = { additionalClass: 'active', onClick: null, unit: '' };
DataField.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  text: PropTypes.string.isRequired,
  unit: PropTypes.string,
};

export default DataField;
