import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    justifyContent: "space-between",

    alignItems: 'center',
  },
  gridContainer: {
    justifyContent: "space-between",

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
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  gridItemDescription: {
    fontSize: 10,
    textAlign: 'center',
  },

});


export default styles;
