
import React, {useState, useEffect   } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import CallDetectorManager from "react-native-call-detection";

const App = () => {
  
  const [featureOn, setFeatureOn] = useState(false)
  const [incoming, setIncoming] = useState(false)
  const [number, setNumber] = useState(null)

  const startListener=()=>{
    setFeatureOn(true)
    const callDetector= new CallDetectorManager( (event, number ) => {
      console.log(event)
      if (event === 'Disconnected') {
        // Do something call got disconnected
        }
        else if (event === 'Connected') {
        // Do something call got connected
        // This clause will only be executed for iOS
        }
        else if (event === 'Incoming') {
        // Do something call got incoming
        }
        else if (event === 'Dialing') {
        // Do something call got dialing
        // This clause will only be executed for iOS
        }
        else if (event === 'Offhook') {
        //Device call state: Off-hook.
        // At least one call exists that is dialing,
        // active, or on hold,
        // and no calls are ringing or waiting.
        // This clause will only be executed for Android
        }
        else if (event === 'Missed') {
            // Do something call got missed
            // This clause will only be executed for Android
        }
    },
    true,
    ()=>{},
    {
      title: 'Phone State Permission',
      message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
    }
    )
  }

  const stopListener=()=> {
    setFeatureOn(false)
    this.callDetector && this.callDetector.dispose();
  }

  const askPermission= async () => {
    try {
     const permissions = await PermissionsAndroid.requestMultiple(
      [
       PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
      ]);
     console.log('Permissions are: ', permissions);
    } catch (err) {
      console.warn(err);
    }
   };

  useEffect(() => {
    askPermission();

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> hello</Text>
      <TouchableOpacity
        onPress={ featureOn ? stopListener : startListener }
        style={styles.btnStyle}
      >
        <Text> { featureOn ? "Disable" :"Enable" } </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#cff",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  btnStyle:{
    backgroundColor: "#fef",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    padding: 15,
  }
});

export default App;
