import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl, dimension}) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer} // Set a specific width and height
      // onPress={handlePress}
    >
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
}

export default ScreenHeaderBtn