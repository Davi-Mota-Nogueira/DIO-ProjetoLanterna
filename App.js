import React, {useState, useEffect} from "react";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const App = ()=> {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(()=> {
    /***
     * Usando a lanterna do celular
     */
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(()=>{
    /***
     * Quando chacoalhoar o celular, troca toggle
     */
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });

    return ()=> subscription.remove();
  },[]);

  return(
    <SafeAreaView>
      <TouchableOpacity onPress={handleToggle}>
        <View style={toggle?style.containerLight:style.container}>
          <Image
          style={toggle?style.lightOn:style.lightOff}
          source={toggle?require('./assets/icons/eco-light.png'):require('./assets/icons/eco-light-off.png')}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );

};

export default App;

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn:{
    height: 200,
    width: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  lightOff:{
    height: 200,
    width: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
