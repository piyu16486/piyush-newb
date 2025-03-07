import {Dimensions} from 'react-native';

const SCREEN_HEIGHT = 736;
const SCREEN_WIDTH = 414;

const {height, width} = Dimensions.get('window');

const Scale = (units = 1) => (width / SCREEN_WIDTH) * units;

const verticalScale = (size = 1) => (height / SCREEN_HEIGHT) * size;

export {verticalScale, Scale};
