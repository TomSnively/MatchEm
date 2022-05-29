import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AudioButtons from './AudioButtons';
import ImageArray from '../utils/images';
import { playRandomSound } from '../utils/sounds';
import MatchEmMusic from '../assets/Rise-Above-Gameplay.mp3';
import cards from '../utils/cards';
import {
  getShuffledArray,
  shuffle,
  getCorrectAnswer,
  roundToOneDecimal,
} from '../utils/utils';
import Square from '../assets/art/square.png';
import RedSquare from '../assets/art/redSquare.png';
import { darkBlue } from '../utils/constants';

const Match10Fast = ({ windowSize }) => {
  const { width, height } = windowSize;
  const widthCheck = Math.floor((width - 96) / 8);
  const heightCheck = Math.floor((height - 24) / 6);
  const boxWidth = Math.min(widthCheck, heightCheck);
  const marginLeft = (width - (boxWidth + 4) * 8) / 2;

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
      marginLeft,
      paddingTop: Math.floor(boxWidth * 0.2),
      paddingBottom: Math.floor(boxWidth * 0.2),
    },
    row1: {
      display: 'flex',
      flexDisplay: 'row',
      paddingTop: 16,
    },
    row2: {
      display: 'flex',
      flexDisplay: 'row',
      paddingBottom: 16,
    },
    cell: {
      width: boxWidth,
      height: boxWidth,
      padding: 2,
    },
    blueBox: {
      backgroundColor: darkBlue,
      width: boxWidth - 0,
      height: boxWidth - 0,
      padding: 0,
    },
    button: {},
    image: {
      width: Math.floor(boxWidth * 0.85),
      height: Math.floor(boxWidth * 0.85),
      zIndex: 20,
      position: 'absolute',
      left: 7,
      top: 2,
    },
    word: {
      fontFamily: 'liberation-sans, sans-serif',
      fontStyle: 'normal',
      color: 'white',
      width: Math.floor(boxWidth * 0.9),
      height: Math.floor(boxWidth * 0.8),
      fontSize: Math.floor(boxWidth * 0.2),
      marginTop: Math.floor(boxWidth * 0.3),
      zIndex: 20,
      textTransform: 'none',
    },
    square: {
      width: boxWidth,
      position: 'absolute',
      zIndex: 4,
      opacity: 0.6,
      left: -2,
      top: -6,
    },
    skip: {
      backgroundColor: darkBlue,
      color: 'white',
      height: Math.floor(boxWidth * 0.5),
      width: boxWidth * 2,
      marginLeft: boxWidth * 3.15,
      textAlign: 'center',
      textTransform: 'none',
      fontSize: Math.floor(boxWidth * 0.3),
      marginTop: 4,
      marginBottom: 4,
    },
    scorboard: {},
    scorboardLine: {
      width: boxWidth * 4 - 10,
      height: Math.floor(boxWidth * 0.4),
      marginLeft: boxWidth * 2.2,
      color: 'white',
      fontSize: Math.floor(boxWidth * 0.25),
      textAlign: 'center',
      backgroundColor: darkBlue,
      paddingTop: Math.floor(boxWidth * 0.1),
      marginBottom: 5,
    },
    returnButton: {
      backgroundColor: darkBlue,
      color: 'white',
      height: Math.floor(boxWidth * 0.7),
      width: boxWidth * 4 - 10,
      marginLeft: boxWidth * 2.2,
      marginBottom: 16,
      textTransform: 'none',
      fontSize: Math.floor(boxWidth * 0.3),
      paddingTop: 16,
      paddingBottom: 16,
    },
    gameOver: {
      width: 400,
      margin: 'auto',
    },
    buttons: {
      display: 'flex',
      flexDisplay: 'row',
    },
    playAgainButton: {
      backgroundColor: darkBlue,
      color: 'white',
      height: Math.floor(boxWidth * 1.2),
      paddingTop: 8,
      marginBottom: 8,
      width: Math.floor(boxWidth * 3),
      marginLeft: boxWidth * 2.5,
      textTransform: 'none',
      fontSize: Math.floor(boxWidth * 0.3),
    },
    soundButtons: {
      marginLeft: -100,
      paddingBottom: 16,
    },
    gameOverReturnButton: {
      backgroundColor: darkBlue,
      color: 'white',
      height: Math.floor(boxWidth * 0.7),
      width: boxWidth * 4 - 10,
      marginLeft: 100,
      marginBottom: 16,
      textTransform: 'none',
      fontSize: Math.floor(boxWidth * 0.3),
      paddingTop: 16,
      paddingBottom: 16,
    },
  };

  const location = useLocation();
  const history = useHistory();
  const numToWin = 10;
  const timeout = 1000;
  let timerInterval;
  const [firstLoad, setFirstLoad] = useState(true);
  const [running, setRunning] = useState(false);
  const [pics, setPics] = useState(false);
  const [words, setWords] = useState(false);
  // This is used when ready to set a new question
  const [setupNewQuestion, setSetupNewQuestion] = useState(true);
  const [matchEmDisplay, setMatchEmDisplay] = useState([]);
  const [mathEmMusic] = useState(new Audio(MatchEmMusic));
  const [musicOn, setMusicOn] = useState();
  const [soundsOn, setSoundsOn] = useState();
  const [matchCorrect, setMatchCorrect] = useState([null, null]);
  const [correct, setCorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [timerStarted, setTimerStarted] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const rowLength = 8;

  const resetSquareOn = Array.from(
    { length: 2 },
    () => Array.from({ length: rowLength }, () => false),
  );

  const handleToggleMusic = () => {
    mathEmMusic.volume = musicOn ? 0 : 1;
    localStorage.setItem('musicOn', !musicOn);
    setMusicOn(!musicOn);
  };

  const handleToggleSounds = () => {
    localStorage.setItem('soundsOn', !soundsOn);
    setSoundsOn(!soundsOn);
  };

  const parseOptions = (search) => {
    // search will look like: ?pics=true&words=false
    const picsIndex = search.indexOf('?pics=');
    const wordsIndex = search.indexOf('&words=');
    const picsOption = search.substr(picsIndex, wordsIndex).substr(6, wordsIndex);
    const wordsOption = search.substr(wordsIndex).substr(7);
    if (picsOption === 'true') setPics(true);
    if (wordsOption === 'true') setWords(true);
  };

  useEffect(() => {
    if (firstLoad) {
      const { search } = location;
      parseOptions(search);
      const storedMusicOn = localStorage.getItem('musicOn');
      setMusicOn(storedMusicOn === 'true');
      const storedSoundsOn = localStorage.getItem('soundsOn');
      setSoundsOn(storedSoundsOn === 'true');

      mathEmMusic.volume = storedMusicOn === 'true' ? 1 : 0;
      mathEmMusic.loop = true;
      mathEmMusic.play();
      if (storedSoundsOn === 'true') playRandomSound('start');
      setRunning(true);
      setTimerStarted(new Date().getTime());
      setFirstLoad(false);
    }
  }, [firstLoad, mathEmMusic, location]);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        setTimeElapsed((now));
      }, 50);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [running]);

  useEffect(() => {
    // We need to wait until parseOptions above completed and at least pics or words is true
    if (setupNewQuestion && (pics || words)) {
      const shuffledArray = getShuffledArray(cards.length - 2);
      const card1Index = shuffledArray[0];
      const card2Index = shuffledArray[1];
      const card1 = shuffle(cards[card1Index].cards);
      const card2 = shuffle(cards[card2Index].cards);
      setMatchCorrect(getCorrectAnswer(card1, card2));
      if (words) {
        const wordsCount = pics ? 3 : 8;
        // Display words for card1
        const randomWordIndexes = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
        for (let i = 0; i < wordsCount; i += 1) {
          card1[randomWordIndexes[i]] = cards[card1[randomWordIndexes[i]]].name;
        }
        // Display words for card2
        const randomWordIndexes2 = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
        for (let i = 0; i < wordsCount; i += 1) {
          card2[randomWordIndexes2[i]] = cards[card2[randomWordIndexes2[i]]].name;
        }
      }
      setMatchEmDisplay([card1, card2]);
      setSetupNewQuestion(false);
    }
  }, [setupNewQuestion, pics, words]);

  const [squareOn, setSquareOn] = useState(resetSquareOn);
  const [redSquareOn, setRedSquareOn] = useState(resetSquareOn);

  const showCorrectMatch = () => {
    const newSquareOn = [...squareOn];
    newSquareOn[0][matchCorrect[0]] = true;
    newSquareOn[1][matchCorrect[1]] = true;
    setRedSquareOn(resetSquareOn);
  };

  const formatTime = (time) => {
    if (time < 0) return '0.0';
    const seconds = time / 1000;
    const round = roundToOneDecimal(seconds);
    return Math.floor(round) === round ? `${round}.0` : round;
  };

  const handleGameOver = () => {
    const time = formatTime(timeElapsed - timerStarted);
    const wrongPenalty = incorrect * 2;
    const totalScore = time + skipped + wrongPenalty;
    const gameMode = `Match10Fast, ${pics ? 'pics' : ''}${words ? 'words' : ''}`;
    const previousBest = localStorage.getItem(gameMode) || Infinity;
    if (totalScore <= previousBest) {
      // New best score
      if (soundsOn) playRandomSound('newBest');
      localStorage.setItem(gameMode, totalScore);
    } else if (soundsOn) playRandomSound('gameOver');
  };

  const handleClick = (row, column) => {
    if (matchCorrect[row] === column) {
      // Match
      setClickable(false);
      if (correct + 1 === numToWin - 1) {
        if (soundsOn) playRandomSound('oneMore');
      } else if (correct + 1 <= numToWin - 2) {
        if (soundsOn) playRandomSound('match');
      }
      setCorrect(correct + 1);
      showCorrectMatch();
      if (correct + 1 === numToWin) {
        // Game Over
        setRunning(false);
        clearInterval(timerInterval);
        handleGameOver();
      } else {
        setTimeout(() => {
          setSetupNewQuestion(true);
          setSquareOn(resetSquareOn);
          setClickable(true);
        }, timeout);
      }
    } else {
      // No Match
      if (soundsOn) playRandomSound('noMatch');
      setIncorrect(incorrect + 1);
      const newSquareOn = [...resetSquareOn];
      newSquareOn[row][column] = true;
      setRedSquareOn(newSquareOn);
    }
  };

  const handleSkip = () => {
    setClickable(false);
    if (soundsOn) playRandomSound('skip');
    setSkipped(skipped + 1);
    setRedSquareOn(resetSquareOn);
    showCorrectMatch();
    setTimeout(() => {
      setSquareOn(resetSquareOn);
      setSetupNewQuestion(true);
      setClickable(true);
    }, timeout);
  };

  const renderCell = (cell, rowIndex, cellIndex) => (
    <div key={cellIndex} style={styles.cell}>
      <div style={styles.blueBox}>
        <Button
          style={styles.button}
          onClick={clickable ? () => handleClick(rowIndex, cellIndex) : () => {}}
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
          {
            redSquareOn[rowIndex][cellIndex] ? (
              <img
                src={RedSquare}
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
            <Typography style={styles.word}>
              {cell}
            </Typography>
          )}
        </Button>
      </div>
    </div>
  );

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} style={rowIndex === 1 || rowIndex === 3 ? styles.row2 : styles.row1}>
      {row.map((cell, cellIndex) => renderCell(cell, rowIndex, cellIndex))}
    </div>
  );

  const handleExit = () => {
    mathEmMusic.pause();
    history.push('/');
  };

  const renderScoreboard = () => (
    <div style={styles.scoreboard}>
      <div style={styles.scorboardLine}>
        {`Matches: ${correct}`}
        &nbsp;&nbsp;&nbsp;
        {`Remaining: ${numToWin - correct}`}
      </div>
      <div style={styles.scorboardLine}>
        {`Skipped: ${skipped}`}
        &nbsp;&nbsp;&nbsp;
        {`Wrong: ${incorrect}`}
      </div>
      <div style={styles.scorboardLine}>
        {`Time: ${formatTime(timeElapsed - timerStarted)}`}
      </div>
      <Button
        style={styles.returnButton}
        onClick={handleExit}
      >
        Return to Main Menu
      </Button>
    </div>
  );

  const handlePlayAgain = () => {
    setSquareOn(resetSquareOn);
    setCorrect(0);
    setSkipped(0);
    setIncorrect(0);
    setClickable(true);
    setFirstLoad(true);
  };

  const renderGameOver = () => {
    const time = formatTime(timeElapsed - timerStarted);
    const wrongPenalty = incorrect * 2;
    const totalScore = roundToOneDecimal(time + skipped + wrongPenalty);
    const gameMode = `Match10Fast, ${pics ? 'pics' : ''}${words ? 'words' : ''}`;
    const previousBest = localStorage.getItem(gameMode);
    return (
      <div style={styles.mainContent}>
        <div style={styles.scorboardLine}>
          GAME OVER!
        </div>
        <div style={styles.scorboardLine}>
          {`Time: ${time}`}
        </div>
        <div style={styles.scorboardLine}>
          {`Skipped: ${skipped} (${skipped} second penalty)`}
        </div>
        <div style={styles.scorboardLine}>
          {`Wrong: ${incorrect} (${wrongPenalty} second penalty)`}
        </div>
        <div style={styles.scorboardLine}>
          {`Total Score: ${totalScore}`}
        </div>
        <div style={styles.scorboardLine}>
          {`Best Score: ${previousBest}`}
        </div>
        <Button
          style={styles.playAgainButton}
          onClick={handlePlayAgain}
        >
          Play Again!
        </Button>
        <div style={styles.buttons}>
          <div style={styles.soundButtons}>
            <AudioButtons
              musicOn={musicOn}
              soundsOn={soundsOn}
              handleToggleMusic={handleToggleMusic}
              handleToggleSounds={handleToggleSounds}
              boxWidth={boxWidth}
            />
          </div>
          <Button
            style={styles.gameOverReturnButton}
            onClick={handleExit}
          >
            Return to Main Menu
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {!firstLoad && !running ? renderGameOver() : (
        <div style={styles.mainContent}>
          {matchEmDisplay[0] && renderRow(matchEmDisplay[0], 0)}
          <Button
            style={styles.skip}
            onClick={clickable ? handleSkip : () => {}}
          >
            Skip
          </Button>
          {matchEmDisplay[1] && renderRow(matchEmDisplay[1], 1)}
          {renderScoreboard()}
        </div>
      )}
    </div>
  );
};

Match10Fast.propTypes = {
  windowSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default Match10Fast;
