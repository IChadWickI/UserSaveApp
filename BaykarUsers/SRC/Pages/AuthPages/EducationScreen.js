import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker'; // @react-native-picker/picker kütüphanesinden Picker bileşeni

function EducationScreen({ route, navigation }) {
  const { formData, jobData } = route.params;

  const [educationLevel, setEducationLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = () => {

    console.log(formData);

    const educationData = {
      educationLevel,
      schoolName,
      department,
      graduationYear,
      skills,
    };
  
    navigation.navigate('LevelScreen', { formData, jobData, educationData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eğitim Seviyesi</Text>
      <Picker
        selectedValue={educationLevel}
        onValueChange={(itemValue) => setEducationLevel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seçiniz" value="" />
        <Picker.Item label="İlkokul" value="İlkokul" />
        <Picker.Item label="Lise" value="Lise" />
        <Picker.Item label="Üniversite" value="Üniversite" />
      </Picker>

      <Text style={styles.title}>Okul Bilgileri</Text>
      <TextInput
        style={styles.input}
        placeholder="Okul Adı"
        value={schoolName}
        onChangeText={setSchoolName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bölüm"
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={styles.input}
        placeholder="Mezuniyet Yılı"
        value={graduationYear}
        onChangeText={setGraduationYear}
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
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
    marginTop: 20,
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
});

export default EducationScreen;
