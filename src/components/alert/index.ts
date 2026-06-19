import { Platform } from 'react-native';

import AlertAndroid from './index.android';
import AlertIOS from './index.ios';
import AlertWeb from './index.web';

let Alert: any;

if (Platform.OS === 'web') {
    Alert = AlertWeb;
} else if (Platform.OS === 'ios') {
    Alert = AlertIOS;
} else {
    Alert = AlertAndroid;
}

export default Alert;
export type { AlertProps } from './types';