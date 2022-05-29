import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AudioButtons from './AudioButtons';
import HowToPlayMusic from '../assets/Rise-Above-HowToPlay.mp3';
import { darkBlue } from '../utils/constants';

const HowToPlay = ({ windowSize }) => {
  const { width, height } = windowSize;
  const widthCheck = Math.floor((width - 96) / 8);
  const heightCheck = Math.floor((height - 24) / 7);
  const boxWidth = Math.min(widthCheck, heightCheck);
  const marginLeft = (width - (boxWidth + 4) * 5);

  const styles = {
    container: {
      height: '100%',
      width: '100%',
      // eslint-disable-next-line global-require
      backgroundImage: `url(${require('../assets/art/background-tile.png')})`,
      backgroundRepeat: 'repeat',
    },
    returnButton: {
      backgroundColor: darkBlue,
      color: 'white',
      width: 200,
      margin: 32,
      textTransform: 'none',
      paddingTop: 16,
      paddingBottom: 16,
      marginLeft,
    },
    soundButtons: {
      marginLeft: 32,
      paddingBottom: 16,
    },
    soundIcon: {
      width: Math.floor(boxWidth * 0.6),
    },
  };

  const [howToPlayMusic] = useState(new Audio(HowToPlayMusic));
  const [musicOn, setMusicOn] = useState();
  const [soundsOn, setSoundsOn] = useState();
  const history = useHistory();

  const handleToggleMusic = () => {
    howToPlayMusic.volume = musicOn ? 0 : 1;
    localStorage.setItem('musicOn', !musicOn);
    setMusicOn(!musicOn);
  };

  const handleToggleSounds = () => {
    localStorage.setItem('soundsOn', !soundsOn);
    setSoundsOn(!soundsOn);
  };

  useEffect(() => {
    const storedMusicOn = localStorage.getItem('musicOn');
    setMusicOn(storedMusicOn === 'true');
    const storedSoundsOn = localStorage.getItem('soundsOn');
    setSoundsOn(storedSoundsOn === 'true');

    howToPlayMusic.volume = storedMusicOn === 'true' ? 1 : 0;
    howToPlayMusic.loop = true;
    howToPlayMusic.play();
  }, [howToPlayMusic]);

  const handleExit = () => {
    howToPlayMusic.pause();
    history.push('/');
  };

  return (
    <div style={styles.container}>
      <Button
        style={styles.returnButton}
        onClick={handleExit}
      >
        Return to Main Menu
      </Button>
      <div style={styles.soundButtons}>
        <AudioButtons
          musicOn={musicOn}
          soundsOn={soundsOn}
          handleToggleMusic={handleToggleMusic}
          handleToggleSounds={handleToggleSounds}
          boxWidth={boxWidth}
        />
      </div>
    </div>
  );
};

HowToPlay.propTypes = {
  windowSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default HowToPlay;
