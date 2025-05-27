import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedView = ({children, styles, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-black' : 'bg-white'
  } ${styles}`;

  return (
    <View {...props} className={themedStyles}>
      {children}
    </View>
  );
};

export default ThemedView;