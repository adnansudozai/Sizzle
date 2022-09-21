import {Images} from '../../../../components';

const courseListDATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    name: 'Bitcoin (BTC)',
    image: Images.bitcoinCourse,
    Videos: '20',
    Watched: '18',
    filterTag: ['All', 'Bitcoin'],
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
    name: 'Binance Coin (BNB)',
    image: Images.binanceCoinCourse,
    Videos: '10',
    Watched: '8',
    filterTag: ['All', 'Binance'],
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
    name: 'Ethereum (ETH)',
    image: Images.ethereumCourse,
    Videos: '15',
    Watched: '15',
    filterTag: ['All', 'Ethereum'],
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
    name: 'Other Crypto (OTH)',
    image: Images.otherCryptoCourse,
    Videos: '30',
    Watched: '0',
    filterTag: [
      'All',
      'Chainlink',
      'Balancer',
      'Polygon',
      'Dogecoin',
      'Synthetix',
      'Uniswap',
      'REN',
      'Tether',
      'AAVE',
      'Maker',
    ],
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
    name: 'Other Courses (OTC)',
    image: Images.cryptoVidSmThumb6,
    Videos: '7',
    Watched: '2',
    filterTag: ['All', 'The Graph', 'SushiSwap', 'Curve Finance', 'Compound'],
  },
];

const allfiltersHARDCoded = [
  'All',
  'Bitcoin',
  'Ethereum',
  'Binance',
  'The Graph',
  'SushiSwap',
  'Curve Finance',
  'Compound',
  'Chainlink',
  'Balancer',
  'Polygon',
  'Dogecoin',
  'Synthetix',
  'Uniswap',
  'REN',
  'Tether',
  'AAVE',
  'Maker',
];

const coursePlaylistDATA = [
  {
    title: 'Bitcoin is still concentrated more than ethereum',
    award: '15 LGX',
    watchStatus: ['0', '30'],
    image: Images.cryptoVidSmThumb1,
  },
  {
    title: 'Now is the best time to buy bitcoin than ever before',
    award: '25 LGX',
    watchStatus: ['18:00', '30:00'],
    image: Images.cryptoVidSmThumb2,
  },
  {
    title: 'Bitcoin selling strategies , earn bitcoin for free',
    award: '10 LGX',
    watchStatus: ['12', '12'],
    image: Images.cryptoVidSmThumb3,
  },
  {
    title: 'sell now and earn half of what you would earn if you hold back',
    award: '20 LGX',
    watchStatus: ['30', '30'],
    image: Images.cryptoVidSmThumb4,
  },
  {
    title: 'Bitcoin trading made easy witht this one app that no one knows',
    award: '5 LGX',
    watchStatus: ['0', '15'],
    image: Images.cryptoVidSmThumb5,
  },
  {
    title:
      'Learn everything about bitcoin for free and earn bitcoin by just that',
    award: '15 LGX',
    watchStatus: ['0', '23'],
    image: Images.cryptoVidSmThumb6,
  },
  {
    title: 'Bitcoin Price more than ethereum ever was in a decade',
    award: '8 LGX',
    watchStatus: ['10', '12'],
    image: Images.cryptoVidSmThumb1,
  },
];

export {courseListDATA, coursePlaylistDATA, allfiltersHARDCoded};
