export const darkBlue = '#242E3D';

export default darkBlue;

export const titleText = [
  'MATCH',
  'EM',
  'PLAY',
  'GAME',
  'HOW',
  'TO*PLAY',
];

export const correctArray = [
  { letter: 'M', path: '/' },
  { letter: 'M', path: '/' },
  { letter: 'A' },
  { letter: 'A' },
  { letter: 'O', path: '/howtoplay' },
  { letter: 'O', path: '/howtoplay' },
];

export const optionsText = [
  'MATCH*10',
  'FAST',
  '30SECOND',
  'RUSH',
  '&PICS&',
  '&WORDS&',
];

export const correctOptionsArray = [
  { letter: 'A', path: '/match10fast' },
  { letter: 'A', path: '/match10fast' },
  { letter: 'S', path: '/30secondrush' },
  { letter: 'S', path: '/30secondrush' },
  { letter: 'S', rowType: 'pics' },
  { letter: 'S', rowType: 'words' },
];
