import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert,Image} from 'react-native';
export default class App extends Component {
  constructor(){
    super()
      this.state={
        url:'',
      }
    this.handlePress.bind(this)
  }
  
handlePress = async () => {
  fetch('https://api.github.com/users/komalvekariya/repos',{method: 'GET'}
      
  )
  .then(response => response.json()).then((responseJson)=>{
    //alert('Response'+JSON.stringify(responseJson[0].owner.avatar_url))
    this.setState({url:JSON.stringify(responseJson[0].owner.avatar_url)})
    alert(this.state.url)
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
     </TouchableOpacity><TouchableOpacity onPress={()=>{this.forceUpdate(alert('hello')),Alert.alert(this.state.url)}}>
    <Image style={{height:100,width:100}} source={{url:this.state.url}}></Image></TouchableOpacity>
</View> 
  );
}
}