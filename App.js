import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert,Image,ScrollView} from 'react-native';
export default class App extends Component {
  constructor(){
    super()
      this.state={
        source:'',
        flag:true,
        num:100,
      }
    this.handlePress.bind(this)
  }

handlePress = async () => {
  fetch('https://api.github.com/users/ankit-sihora/repos',{method: 'GET'}
      
  )
  .then(response => response.json()).then((responseJson)=>{
    //alert('Response'+JSON.stringify(responseJson[0].owner.avatar_url))
    this.setState({source:responseJson[0].owner.avatar_url,flag:false,num:50})
    alert(this.state.source)
  })
  .catch((error) => {
      console.error(error);
  });
}
  render(){
   
  return(
   <View style={{flex:1,paddingTop: 50, paddingLeft: 50, backgroundColor:'white' }}>
   <Text> Some other text </Text>
    <Text> Some other text </Text>
    <TouchableOpacity onPress={this.handlePress}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
     </TouchableOpacity><ScrollView><TouchableOpacity style={{backgroundColor:'green',margin:30}} onPress={()=>{Alert.alert(this.state.source)}}>
     {(!this.state.flag)?
    <Image style={{height:100,width:100}} source={{url:this.state.source}}></Image>:(<View></View>)}</TouchableOpacity></ScrollView>
</View> 
  );
}
}