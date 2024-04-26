import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 16,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 110,
    // alignItems: 'center', // Center the items vertically
  },
  gridItemImage: {
    width: 80, // Set a width for the image
    height: 80, // Set a height for the image
    marginRight: 16, // Adjust the spacing between the image and text
  },
  iconContainer: {
    marginRight: 8, // Adjust the spacing between the icon and text
  },
  iconImage: {
    width: 20, // Set a width for the icon
    height: 20, // Set a height for the icon
  },
  gridItemTextContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start', // Center the content vertically
    flexDirection: 'row', // Arrange children in a row
  },
  gridItemTextDescription: {
    width: '100%',
  },
  gridItemText: {
    textAlign: 'center',
    fontWeight: 'bold', // Make the text bold
    fontSize: 14, // Set the font size to your preference
    flex:1,
  },
  TextContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column', // This makes its children stack vertically
    justifyContent: 'flex-start', // Center the content vertically
    marginTop: 1,
  },
});


export default styles;
