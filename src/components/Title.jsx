import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ImageArray from '../utils/images';
import { playRandomSound } from '../utils/sounds';
import TitleMusic from '../assets/Rise-Above-Title.mp3';
import cards from '../utils/cards';
import { shuffle, randomInteger } from '../utils/utils';
import Square from '../assets/art/square.png';
import {
  darkBlue,
  titleText,
  correctArray,
  optionsText,
  correctOptionsArray,
} from '../utils/constants';

const Title = ({ windowSize }) => {
  const { width, height } = windowSize;
  const widthCheck = Math.floor((width - 50) / 9);
  const heightCheck = Math.floor((height - 40) / 7);
  const boxWidth = Math.min(widthCheck, heightCheck);
  const marginLeft = (width - (boxWidth + 2) * 8) / 2;

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      // eslint-disable-next-line global-require
      backgroundImage: `url(${require('../assets/art/background-tile.png')})`,
      backgroundRepeat: 'repeat',
    },
    mainContent: {
      height: '100%',
      width: '100%',
      paddingTop: 16,
      paddingBottom: 16,
    },
    row1: {
      marginLeft,
      display: 'flex',
      flexDisplay: 'row',
    },
    row2: {
      marginLeft,
      display: 'flex',
      flexDisplay: 'row',
      paddingBottom: Math.floor(boxWidth * 0.2),
    },
    cell: {
      width: boxWidth,
      height: boxWidth,
      padding: 2,
    },
    blueBox: {
      backgroundColor: darkBlue,
      width: boxWidth - 4,
      height: boxWidth - 4,
      padding: 2,
    },
    image: {
      width: Math.floor(boxWidth * 0.85),
      height: Math.floor(boxWidth * 0.85),
      zIndex: 20,
      position: 'absolute',
      left: 3,
      top: -2,
    },
    letter: {
      fontFamily: 'liberation-sans, sans-serif',
      fontStyle: 'normal',
      color: 'white',
      width: Math.floor(boxWidth * 0.8),
      fontSize: Math.floor(boxWidth * 0.6),
      zIndex: 20,
    },
    square: {
      width: boxWidth,
      position: 'absolute',
      zIndex: 4,
      opacity: 0.6,
      left: -4,
      top: -6,
    },
  };

  const history = useHistory();
  const rowLength = 8;
  const resetSquareOn = Array.from({ length: 6 }, () => Array.from({ length: 8 }, () => false));
  const [squareOn, setSquareOn] = useState(resetSquareOn);
  const [firstLoad, setFirstLoad] = useState(true);
  const [optionsLoad, setOptionsLoad] = useState(false);
  const [picsOn, setPicsOn] = useState(true);
  const [wordsOn, setWordsOn] = useState(false);
  const [titleDisplay, setTitleDisplay] = useState([]);
  const [titleMusic] = useState(new Audio(TitleMusic));

  const highlightMatch = useCallback((tempTitleDisplay, row, matchingRow) => {
    const newSquareOn = [...squareOn];
    const correctLetter = optionsLoad ? correctOptionsArray[row].letter : correctArray[row].letter;
    const correctIndex = tempTitleDisplay[row].findIndex((letter) => letter === correctLetter);
    const matchingIndex = tempTitleDisplay[matchingRow]
      .findIndex((letter) => letter === correctLetter);
    newSquareOn[row][correctIndex] = true;
    newSquareOn[matchingRow][matchingIndex] = true;
    setSquareOn(newSquareOn);
  }, [optionsLoad, squareOn]);

  useEffect(() => {
    if (firstLoad) {
      const storedMusicOn = localStorage.getItem('musicOn');
      const storedSoundsOn = localStorage.getItem('soundsOn');

      const numCards = cards.length - 2;
      const cardIndex = Array(numCards).fill().map((x, i) => i);
      const shuffledArray = shuffle(cardIndex);
      const titleRow = (title, startIndex) => {
        const titleArray = Array(rowLength).fill().map((x, i) => shuffledArray[startIndex + i]);
        const titleLength = title.length;
        const nameStartIndex = randomInteger(rowLength - titleLength + 1);
        [...title].forEach((letter, i) => {
          if (letter !== '*' && letter !== '&') {
            titleArray[nameStartIndex + i] = letter;
          }
        });
        if (optionsLoad && startIndex === 32) {
          titleArray[0] = picsOn ? 57 : 58;
          titleArray[7] = picsOn ? 57 : 58;
        } else if (optionsLoad && startIndex === 40) {
          titleArray[0] = wordsOn ? 57 : 58;
          titleArray[7] = wordsOn ? 57 : 58;
        }
        return titleArray;
      };

      titleMusic.volume = storedMusicOn === 'true' ? 1 : 0;
      titleMusic.loop = true;
      titleMusic.play();
      if (storedSoundsOn === 'true' && !optionsLoad) playRandomSound('matchEm');

      const textToUse = optionsLoad ? optionsText : titleText;
      const tempDisplay = textToUse
        .map((title, rowNumber) => titleRow(textToUse[rowNumber], rowNumber * 8));
      setTitleDisplay(tempDisplay);
      if (optionsLoad) highlightMatch(tempDisplay, 4, 5);

      setFirstLoad(false);
    }
  }, [firstLoad, titleDisplay, titleMusic, optionsLoad, highlightMatch, picsOn, wordsOn]);

  const handleUpdatePicsOrWords = (type) => {
    let newPics = picsOn;
    let newWords = wordsOn;
    if (type === 'pics') {
      newPics = !newPics;
      if (!newPics) newWords = true;
    }
    if (type === 'words') {
      newWords = !newWords;
      if (!newWords) newPics = true;
    }

    const tempDisplay = [...titleDisplay];
    tempDisplay[4][0] = newPics ? 57 : 58;
    tempDisplay[4][7] = newPics ? 57 : 58;
    tempDisplay[5][0] = newWords ? 57 : 58;
    tempDisplay[5][7] = newWords ? 57 : 58;
    setTitleDisplay(tempDisplay);
    setPicsOn(newPics);
    setWordsOn(newWords);
  };

  const handleClick = (row) => {
    // Handle changing options immediately without a setTimeout
    if (optionsLoad && row >= 4) {
      if (row === 4) handleUpdatePicsOrWords('pics');
      if (row === 5) handleUpdatePicsOrWords('words');
    } else {
      // Want to turn the white square on the 2 rows in the category they clicked
      // Matching row is if row is even, row + 1, otherwise row - 1
      const matchingRow = row % 2 === 0 ? row + 1 : row - 1;
      highlightMatch(titleDisplay, row, matchingRow);

      setTimeout(() => {
        setSquareOn(resetSquareOn);
        switch (optionsLoad ? `${row}-options` : row) {
          case 0:
          case 1:
            titleMusic.pause();
            titleMusic.currentTime = 0.0;
            setFirstLoad(true);
            break;
          case 2:
          case 3:
            setOptionsLoad(true);
            setFirstLoad(true);
            break;
          case 4:
          case 5:
            titleMusic.pause();
            titleMusic.currentTime = 0.0;
            history.push(correctArray[row].path);
            break;
          case '0-options':
          case '1-options':
          case '2-options':
          case '3-options':
            titleMusic.pause();
            titleMusic.currentTime = 0.0;
            history.push(`${correctOptionsArray[row].path}/?pics=${picsOn}&words=${wordsOn}`);
            break;
          default:
        }
      }, 500);
    }
  };

  const renderCell = (cell, rowIndex, cellIndex) => (
    <div key={cellIndex} style={styles.cell}>
      <div style={styles.blueBox}>
        <Button
          onClick={() => handleClick(rowIndex, cellIndex)}
        >
          {
            squareOn[rowIndex][cellIndex] ? (
              <img
                src={Square}
                alt="correct"
                style={styles.square}
              />
            ) : null
          }
          {typeof cell === 'number' ? (
            <img
              src={ImageArray[cell]}
              alt={cards[cell].name}
              style={styles.image}
            />
          ) : (
            <Typography style={styles.letter}>
              {cell}
            </Typography>
          )}
        </Button>
      </div>
    </div>
  );

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} style={rowIndex % 2 === 0 ? styles.row1 : styles.row2}>
      {row.map((cell, cellIndex) => renderCell(cell, rowIndex, cellIndex))}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {titleDisplay.map((row, index) => renderRow(row, index))}
      </div>
    </div>
  );
};

Title.propTypes = {
  windowSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default Title;
