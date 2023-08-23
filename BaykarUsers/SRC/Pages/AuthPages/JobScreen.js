import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

function JobScreen({ route, navigation }) {
  const { formData } = route.params;
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = () => {
    console.log(formData);

    // Verileri kaydetme veya işlem yapma

    const jobData = {
      employmentStatus,
      job,
    };

    navigation.navigate('EducationScreen', {
      formData: formData, // Registerscreen'den gelen veriler
      jobData,

    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} marginBottom={20}>Çalışma Durumu</Text>

      <Picker
        selectedValue={employmentStatus}
        onValueChange={(itemValue) => setEmploymentStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Çalışıyor" value="alışıyor" />
  <Picker.Item label="İşsiz" value="İşsiz" />
  <Picker.Item label="Öğrenci" value="Öğrenci" />
  <Picker.Item label="Emekli" value="Emekli" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Meslek Bilgisi"
        value={job}
        onChangeText={setJob}
      />

    <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>İlerle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
  },
  picker: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 145,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
},
footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#FFFFFF',
  alignItems: 'center', // Yatayda ortalamak için
  paddingVertical: 10,
},
nextButton: {
  backgroundColor: '#8A2BE2',
  paddingHorizontal: 100,
  paddingVertical: 10,
  borderRadius: 8,
  marginRight:10,
},
});

export default JobScreen;