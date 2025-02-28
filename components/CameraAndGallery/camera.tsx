import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);


  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      Alert.alert('Фото сохранено!', 'Изображение добавлено в галерею.');
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Доступ к камере не разрешен</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Разрешить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.switchButton} onPress={toggleCameraFacing}>
          <Text style={styles.buttonText}>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture} />

        <View style={styles.placeholder} /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 55,
  },
  switchButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,0.3)',
    marginTop: 5,
  },
  placeholder: {
    width: 50,
    height: 50,
  },
});
