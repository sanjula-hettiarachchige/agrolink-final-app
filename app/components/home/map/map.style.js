import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapImage: {
    flex: 1,
    alignSelf: 'flex-end', // Align the image to the bottom of the container
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    flex: 1, // Take up all available space
    width: '100%',
    aspectRatio: 1,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "flex-end", // Move the image to the bottom
    alignItems: "flex-start", // Align the text to the left
    overflow: 'hidden',
    padding: 16, // Add padding
  },
  mapOverviewText: {
    fontWeight: 'bold', // Make the text bold
  },
});

export default styles;
