import {StyleSheet, Dimensions} from 'react-native';
import { Screen } from '../../../Transforms/Screen';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

export default StyleSheet.create({
  container: {
    height: dimensions.height,
    width: dimensions.width,
    // paddingVertical: 24,
  },
  channelInputContainer: {
    padding: 10,
  },
  joinLeaveButtonContainer: {
    padding: 10,
  },
  usersListContainer: {
    padding: 10,
  },
  floatRight: {
    position: 'absolute',
    right: 10,
    bottom: 40,
    width: 80,
  },
  floatLeft: {
    position: 'absolute',
    left: 10,
    bottom: 40,
    width: 150,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  BottomFeature: {
    position:'absolute',
    bottom:50,
    width:Screen.width,
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:20,
    alignItems:'center',
    paddingHorizontal:Screen.width*0.1
  },
  Main :{
    justifyContent:"center",
    width:Screen.width,
    alignItems:'center',
    marginTop:Screen.height*0.1
  }
});
