import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

function LevelScreen({ route, navigation }) {
    const { formData, jobData, educationData } = route.params;

  const [educationLevel, setEducationLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState(''); // İyi, Orta, Çok İyi, Profesyonel

  const handleSubmit = () => {
    console.log(formData);

    // Verileri kaydetme veya işlem yapma
    const skillData = {
      skills,
    };
  
    navigation.navigate('CVScreen', { formData, jobData, educationData,skillData });
  };

  const handleAddSkill = () => {
    if (newSkill && skillLevel) {
      const newSkillEntry = {
        skill: newSkill,
        level: skillLevel,
      };
      setSkills([...skills, newSkillEntry]);
      setNewSkill('');
      setSkillLevel('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yetkinlikler ve Dereceler</Text>
      <View style={styles.skillInputContainer} >
        <TextInput
          style={styles.skillInput}
          placeholder="Yetenek"
          value={newSkill}
          onChangeText={setNewSkill}
        />
        <Picker
          selectedValue={skillLevel}
          onValueChange={(itemValue) => setSkillLevel(itemValue)}
          style={styles.skillPicker}         
        >
          <Picker.Item label="Seviye Seçin" value="" />
          <Picker.Item label="İyi" value="iyi" />
          <Picker.Item label="Orta" value="orta" />
          <Picker.Item label="Çok İyi" value="cok_iyi" />
          <Picker.Item label="Profesyonel" value="profesyonel" />
        </Picker>
        <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.skillList}>
        {skills.map((skillEntry, index) => (
          <View key={index} style={styles.skillItem}>
            <Text style={styles.skillText}>{skillEntry.skill}</Text>
            <Text style={styles.skillText}>{skillEntry.level}</Text>
          </View>
        ))}
      </View>
     
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>İlerle</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
    marginTop: 20,
  },
  skillInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  skillInput: {
    width:200,
    height: 40,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft:10,
  },
  skillPicker: {
    width:120,
    height: 40,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    marginRight: 10,
    
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight:10,
  },
  nextButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  skillList: {
    width: '80%',
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 5,
  },
  skillText: {
    fontSize: 16,
  },
});

export default LevelScreen;
