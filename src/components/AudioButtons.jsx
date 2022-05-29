import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MusicYes from '../assets/art/MusicYes.png';
import SoundsNo from '../assets/art/SoundsNo.png';
import SoundsYes from '../assets/art/SoundsYes.png';
import MusicNo from '../assets/art/MusicNo.png';

const AudioButtons = ({
  handleToggleMusic,
  handleToggleSounds,
  musicOn,
  soundsOn,
  boxWidth,
}) => {
  const styles = {
    soundIcon: {
      width: Math.floor(boxWidth * 0.6),
    },
  };
  return (
    <>
      <Button
        onClick={handleToggleMusic}
      >
        <img
          src={musicOn ? MusicYes : MusicNo}
          alt={`music ${musicOn ? 'on' : 'off'}`}
          style={styles.soundIcon}
        />
      </Button>
      <Button
        onClick={handleToggleSounds}
      >
        <img
          src={soundsOn ? SoundsYes : SoundsNo}
          alt={`music ${soundsOn ? 'on' : 'off'}`}
          style={styles.soundIcon}
        />
      </Button>
    </>
  );
};

AudioButtons.propTypes = {
  handleToggleMusic: PropTypes.func.isRequired,
  handleToggleSounds: PropTypes.func.isRequired,
  musicOn: PropTypes.bool,
  soundsOn: PropTypes.bool,
  boxWidth: PropTypes.number,
};

AudioButtons.defaultProps = {
  musicOn: false,
  soundsOn: false,
  boxWidth: 0,
};

export default AudioButtons;
