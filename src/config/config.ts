import Config from 'react-native-config';
import {getEnvironmentVariable} from '@utils/Utils';

export const API_URL = getEnvironmentVariable(Config.API_URL);
