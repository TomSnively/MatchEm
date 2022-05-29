import fiveSeconds1 from '../assets/sounds/5 seconds 1.mp3';
import fiveSeconds2 from '../assets/sounds/5 seconds 2.mp3';
import fiveSeconds3 from '../assets/sounds/5 seconds 3.mp3';
import fiveSeconds4 from '../assets/sounds/5 seconds 4.mp3';
import fiveSeconds5 from '../assets/sounds/5 seconds 5.mp3';
import gameOver1 from '../assets/sounds/game over 1.mp3';
import gameOver2 from '../assets/sounds/game over 2.mp3';
import gameOver3 from '../assets/sounds/game over 3.mp3';
import gameOver4 from '../assets/sounds/game over 4.mp3';
import gameOver5 from '../assets/sounds/game over 5.mp3';
import gameOver6 from '../assets/sounds/game over 6.mp3';
import match1 from '../assets/sounds/match 1.mp3';
import match2 from '../assets/sounds/match 2.mp3';
import match3 from '../assets/sounds/match 3.mp3';
import match4 from '../assets/sounds/match 4.mp3';
import match5 from '../assets/sounds/match 5.mp3';
import match6 from '../assets/sounds/match 6.mp3';
import match7 from '../assets/sounds/match 7.mp3';
import match8 from '../assets/sounds/match 8.mp3';
import match9 from '../assets/sounds/match 9.mp3';
import matchEm1 from '../assets/sounds/match em 1.mp3';
import matchEm2 from '../assets/sounds/match em 2.mp3';
import newBest1 from '../assets/sounds/new best score 1.mp3';
import newBest2 from '../assets/sounds/new best score 2.mp3';
import newBest3 from '../assets/sounds/new best score 3.mp3';
import newBest4 from '../assets/sounds/new best score 4.mp3';
import newBest5 from '../assets/sounds/new best score 5.mp3';
import noMatch1 from '../assets/sounds/no match 1.mp3';
import noMatch2 from '../assets/sounds/no match 2.mp3';
import noMatch3 from '../assets/sounds/no match 3.mp3';
import noMatch4 from '../assets/sounds/no match 4.mp3';
import noMatch5 from '../assets/sounds/no match 5.mp3';
import noMatch6 from '../assets/sounds/no match 6.mp3';
import noMatch7 from '../assets/sounds/no match 7.mp3';
import noMatch8 from '../assets/sounds/no match 8.mp3';
import noMatch9 from '../assets/sounds/no match 9.mp3';
import noMatch10 from '../assets/sounds/no match 10.mp3';
import noMatch11 from '../assets/sounds/no match 11.mp3';
import noMatch12 from '../assets/sounds/no match 12.mp3';
import noMatch13 from '../assets/sounds/no match 13.mp3';
import noMatch14 from '../assets/sounds/no match 14.mp3';
import noMatch15 from '../assets/sounds/no match 15.mp3';
import noMatch16 from '../assets/sounds/no match 16.mp3';
import noMatch17 from '../assets/sounds/no match 17.mp3';
import noMatch18 from '../assets/sounds/no match 18.mp3';
import noMatch19 from '../assets/sounds/no match 19.mp3';
import noMatch20 from '../assets/sounds/no match 20.mp3';
import noMatch21 from '../assets/sounds/no match 21.mp3';
import noMatch22 from '../assets/sounds/no match 22.mp3';
import noMatch23 from '../assets/sounds/no match 23.mp3';
import oneMore1 from '../assets/sounds/one more 1.mp3';
import oneMore2 from '../assets/sounds/one more 2.mp3';
import skip1 from '../assets/sounds/skip 1.mp3';
import skip2 from '../assets/sounds/skip 2.mp3';
import skip3 from '../assets/sounds/skip 3.mp3';
import skip4 from '../assets/sounds/skip 4.mp3';
import skip5 from '../assets/sounds/skip 5.mp3';
import skip6 from '../assets/sounds/skip 6.mp3';
import skip7 from '../assets/sounds/skip 7.mp3';
import skip8 from '../assets/sounds/skip 8.mp3';
import start1 from '../assets/sounds/start 1.mp3';
import start2 from '../assets/sounds/start 2.mp3';
import start3 from '../assets/sounds/start 3.mp3';
import start4 from '../assets/sounds/start 4.mp3';
import start5 from '../assets/sounds/start 5.mp3';
import start6 from '../assets/sounds/start 6.mp3';
import { randomInteger } from './utils';

export const fiveSecondsSounds = [
  fiveSeconds1,
  fiveSeconds2,
  fiveSeconds3,
  fiveSeconds4,
  fiveSeconds5,
];

export const gameOverSounds = [
  gameOver1,
  gameOver2,
  gameOver3,
  gameOver4,
  gameOver5,
  gameOver6,
];

export const matchSounds = [
  match1,
  match2,
  match3,
  match4,
  match5,
  match6,
  match7,
  match8,
  match9,
];

export const matchEmSounds = [
  matchEm1,
  matchEm2,
];

export const newBestSounds = [
  newBest1,
  newBest2,
  newBest3,
  newBest4,
  newBest5,
];

export const noMatchSounds = [
  noMatch1,
  noMatch2,
  noMatch3,
  noMatch4,
  noMatch5,
  noMatch6,
  noMatch7,
  noMatch8,
  noMatch9,
  noMatch10,
  noMatch11,
  noMatch12,
  noMatch13,
  noMatch14,
  noMatch15,
  noMatch16,
  noMatch17,
  noMatch18,
  noMatch19,
  noMatch20,
  noMatch21,
  noMatch22,
  noMatch23,
];

export const oneMoreSounds = [
  oneMore1,
  oneMore2,
];

export const skipSounds = [
  skip1,
  skip2,
  skip3,
  skip4,
  skip5,
  skip6,
  skip7,
  skip8,
];

export const startSounds = [
  start1,
  start2,
  start3,
  start4,
  start5,
  start6,
];

export const playRandomSound = (type) => {
  let soundItem;
  switch (type) {
    case 'fiveSeconds':
      soundItem = fiveSecondsSounds[randomInteger(fiveSecondsSounds.length)];
      break;
    case 'gameOver':
      soundItem = gameOverSounds[randomInteger(gameOverSounds.length)];
      break;
    case 'match':
      soundItem = matchSounds[randomInteger(matchSounds.length)];
      break;
    case 'matchEm':
      soundItem = matchEmSounds[randomInteger(matchEmSounds.length)];
      break;
    case 'newBest':
      soundItem = newBestSounds[randomInteger(newBestSounds.length)];
      break;
    case 'noMatch':
      soundItem = noMatchSounds[randomInteger(noMatchSounds.length)];
      break;
    case 'oneMore':
      soundItem = oneMoreSounds[randomInteger(oneMoreSounds.length)];
      break;
    case 'skip':
      soundItem = skipSounds[randomInteger(skipSounds.length)];
      break;
    case 'start':
      soundItem = startSounds[randomInteger(startSounds.length)];
      break;
    default:
      return;
  }
  const sound = new Audio(soundItem);
  sound.play();
};
