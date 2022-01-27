import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  filename: {
    marginLeft: 20,
  },
  file: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: '-1px',
  },
}));

const ImageFile = ({ onSelect, attribute, label, hideFileName }) => {
  const classes = useStyles();
  const [file, setFile] = useState(null);

  const handleImage = (e) => {
    if (!e.target.files[0]) return;

    setFile(e.target.files[0]);

    if (onSelect) {
      onSelect({ [attribute]: e.target.files[0] });
    }
  };

  return (
    <Box>
      <Input
        type="file"
        accept="image/*"
        id={attribute}
        name={attribute}
        style={{ width: '1px' }}
        onChange={handleImage}
      />
      <label htmlFor={attribute}>
        <Button className={classes.file} variant="contained" component="span">
          {label || 'Imagen'}
        </Button>
        {file && !hideFileName && (
          <span className={classes.filename}>
            {file.name}
          </span>
        )}
      </label>
    </Box>
  );
};

ImageFile.defaultProps = {
  hideFileName: false,
};

ImageFile.propTypes = {
  onSelect: PropTypes.func.isRequired,
  attribute: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideFileName: PropTypes.bool,
};

export default ImageFile;
