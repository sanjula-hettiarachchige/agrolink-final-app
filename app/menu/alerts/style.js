import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({
  iconImage: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
    marginRight: 8, // Adjust the margin as needed
  }, 

  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'center', // Start from the left
  },
  gridContainer: {
    justifyContent: "space-between",

  },
  gridItemTextContainer: {
    flexDirection: 'row', // Arrange children in a row
    marginBottom:10,
    // alignItems: 'center', // Align children vertically in the center
  },
  gridItem: {
    flex: 1,
    width: 160, // Set a fixed width for uniformity
    marginBottom: 16,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 16,
  },
  gridItemImage: {
    width: 160,
    height: 120, // Set a fixed height as needed
    margin:0,
    marginBottom: 8,
  },
  gridItemText: {
    fontSize: 14,
    flex: 1,
  },
  connectButton: {
    backgroundColor: 'purple',
    borderRadius: 15, // Adjust the border radius as needed
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'center', // Center the button horizontally
    marginTop: 10, // Adjust the margin as needed
  },
  connectButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    width: '90%',
    height: 150,
    borderRadius: 20,
    paddingBottom:20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  }

});


export default styles;
