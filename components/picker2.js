var ImagePicker = require('react-native-image-picker');
const FilePickerManager = require('NativeModules').FilePickerManager;


var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

let pick = (cb) => {
  /*
       ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
        alert(JSON.stringify(response))
    let source = { uri: response.uri };
    cb(source, response.data);
   
    
  }
});*/



 FilePickerManager.showFilePicker(null, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled file picker');
  }
  else if (response.error) {
    console.log('FilePickerManager Error: ', response.error);
  }
  else {
    
    let source = { uri: response.uri };
    cb(source, response.path);
  }
});
  }

module.exports= pick;