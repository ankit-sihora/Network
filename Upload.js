import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  AppRegistry,
  Alert
} from 'react-native';
 
import ImagePicker from 'react-native-image-picker';
 
export default class App extends Component {
  constructor(){
    super()
    this.state= {
        ImageSource: null,
        selectedImages:'',
        url: null,
        dataSource: 'w',
    };}
    handlePress = async () => {
        let data = new FormData();
        let photo = {
            uri: this.state.selectedImages.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
  }
            data.append("file", photo);

          fetch('https://pictshare.net/api/upload.php', {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: data,
          }).then(res => {
            res.json();
            var ankit = JSON.stringify(res._bodyInit);
            var bnkit=ankit.split('\"');
            Alert.alert('ank',bnkit[12])
            this.setState({dataSource: bnkit[12] });
        })
            // .then(res => {
            //     // this.setState({dataSource: res.url });
            //     console.warn('hello',JSON.stringify(res))
            // })
            .catch(err => {
              console.warn("error uploading images: ", err);
            });
      }
    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      ImagePicker.showImagePicker(options, (response) => {
        console.warn('Response = ', response);
        this.setState({
            selectedImages:response
          });
  
        if (response.didCancel) {
          console.warn('User cancelled photo picker');
        }
        else if (response.error) {
          console.warn('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.warn('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
            ImageSource: source,
            selectedImages:response
          });
        }
      });
    }
  
    render() {
      return (
        <View style={styles.container}>
 
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
            <View style={styles.ImageContainer}>
 
            { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }
 
            </View>
 
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePress.bind(this)}>
          <View style={styles.ImageContainer}>
 
            { this.state.dataSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={{uri:`${this.state.dataSource}`}} />
            }
 
            </View>
            </TouchableOpacity>
        </View>
      );
    }
  
  }
  
  const styles = StyleSheet.create({
 
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF8E1'
    },
 
    ImageContainer: {
      borderRadius: 10,
      width: 500,
      height: 500,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDDC39',
      
    },
 
  });
 AppRegistry.registerComponent('ImagePickerProject', () => App);