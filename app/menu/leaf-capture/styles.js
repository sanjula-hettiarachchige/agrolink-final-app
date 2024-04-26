import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    camera:{
        flex:1,
        borderRadius:20,
    },
    loaderContainer: {
        // marginTop: SIZES.medium
    },
    cameraButton:{
        borderRadius:10,
        backgroundColor:'green',
        padding: 8,
        margin:10,
    },
    // cameraImage: {
    //     flex: 1,
    //     width: '100%',
    //     resizeMode: 'cover', // Use 'cover' to maintain the image's aspect ratio
    //     borderRadius: 20,
    // },
    imageContainer: {
        flex: 1/4, 
        marginTop: 20 
    }
    
})

export default styles;