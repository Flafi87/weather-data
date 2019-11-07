import React from 'react';
import PropTypes from 'prop-types';
/**
 * @param  {number} data
 * @param  {string} text
 * @param  {string} ending
 * @param  {string} color
 */
const DataField = ({
  data, text, ending, color,
}) => (
  <div className="data" style={{ backgroundColor: color }}>
    <div>{text}</div>
    <div>
      {data}
      {ending}
    </div>
  </div>
);

DataField.defaultProps = {
  text: '',
  ending: '',
  color: '#314052',
};

DataField.propTypes = {
  data: PropTypes.string.isRequired,
  text: PropTypes.string,
  ending: PropTypes.string,
  color: PropTypes.string,
};

export default DataField;
