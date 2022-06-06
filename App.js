import React, {useState, useEffect} from "react";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";

const imageProfile = 'https://avatars.githubusercontent.com/u/46698426?v=4';
const urlGitHub = 'https://github.com/Davi-Mota-Nogueira';

const App = ()=> {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(oldToggle => !oldToggle);
  const handlePressGoToGithub = async () => {
    const res = await Linking.canOpenURL(urlGitHub);
    if (res) {
      await Linking.openURL(urlGitHub);
    }
  };

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
          <Pressable onPress={handlePressGoToGithub}>
            <Image
              accessibilityLabel="Davi no quarto com cabelos soltos."
              style={style.avatar}
              source={{uri: imageProfile}}
            />
          </Pressable>
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
    flexDirection: 'row',
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
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
});
