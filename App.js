import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert,Image,ScrollView,TextInput} from 'react-native';
export default class App extends Component {
  constructor(){
    super()
      this.state={
        source:'',
        flag:true,
        name:'',
        since:46158482,
      }
    this.handlePress.bind(this)
  }

handlePress = async () => {
  var since = "https://api.github.com/users?since="+this.state.since
  fetch(since,{method: 'GET'}
      
  )
  .then(response => response.json()).then((responseJson)=>{
    //alert('Response'+JSON.stringify(responseJson[0].owner.avatar_url))
    this.setState({source:responseJson[0].avatar_url,flag:false,name:responseJson[0].login})
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
    <Text> Enter github user id  </Text>
    <TextInput placeholder="enter number" style={{backgroundColor:'#acb233'}} onChangeText={(text)=>{this.setState({since:text-1})}}></TextInput>
    <TouchableOpacity onPress={this.handlePress}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
     </TouchableOpacity><ScrollView><TouchableOpacity style={{backgroundColor:'#acb233',margin:30}} onPress={()=>{Alert.alert(this.state.source)}}>
     {(!this.state.flag)?<View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}>
    <Image style={{height:100,width:100}} source={{uri:this.state.source}}></Image><Text style={{fontSize:24}}>{this.state.name}</Text></View>:(<View></View>)}</TouchableOpacity></ScrollView>
</View> 
  );
}
}