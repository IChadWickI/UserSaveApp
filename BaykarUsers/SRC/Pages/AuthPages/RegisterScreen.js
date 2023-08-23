import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Platform,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Country, State } from 'country-state-city';
import { Formik } from 'formik';
import UsersTable from '../../SqLite/UsersTable';


function RegisterScreen({ navigation }) {
  //const [photo, setPhoto] = useState(null);
  const [buttonBackgroundImage, setButtonBackgroundImage] = useState('');
   //const imageSource = backgroundImage ? { uri: backgroundImage } : require('./assets/imagesource.png');
  const imageSource = require('../../assets/images.png');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]); // Ülkelerin listesini tutacak state
  const [cities, setCities] = useState([]); // İllerin listesini tutacak state

  const [loading, setLoading] = useState(false);
  const [checkTC, setcheckTC] = useState(false);

  const [password, setpassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [gender, setGender] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);


  const [randomUser, setRandomUser] = useState(null);




  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    } catch (error) {
      //console.error('Error fetching countries:', error);
    }
  };

 const FakeJsonApi = async () => {
    const apiUrl = "http://10.0.2.2:8080/users";

    try {
        const response = await axios.get(apiUrl);
        const users = response.data;

        if (users.length > 0) {
            const randomIndex = Math.floor(Math.random() * users.length);
            const randomUser = users[randomIndex]; // randomUser'ı burada tanımla
            setRandomUser(randomUser); // randomUser'ı set et
            setFullName(randomUser.fullname);
            setPhoneNumber(randomUser.phone);        
            setIdentityNumber(randomUser.id)
        } else {
            console.error("No users found.");
        }
    } catch (error) {
        console.info(error);
        console.error("Error fetching data:", error);
    }
};

  const fetchCities = async (countryCode) => {
    try {
      const stateList = State.getStatesOfCountry(countryCode);
      const cityNames = stateList.map(state => state.name);

      setCities(cityNames);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
    FakeJsonApi();





  }, []);

  const handleCountryChange = (countryCode) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCountry(countryCode);
      fetchCities(countryCode);
      setLoading(false);

    }, 5000);
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);

  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      toggleDatepicker();

      const formattedDate = formatDateForAndroid(currentDate); // Format the date for Android
      setDateOfBirth(formattedDate);

    } else {
      toggleDatepicker();
    }

  };

  const formatDateForAndroid = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  

  const handleSubmit = () => {
    if (!kvkkAccepted) {
      alert('KVKK Onayı vermelisiniz!');
      return;
    }
    navigation.navigate('Job'); 
  };

  const checkIfUserExists = (identityNumber) => {
    UsersTable.getUserByIdentityNumber(identityNumber, (user) => {
      
      if(user === null){
        console.log('true');
        
        setcheckTC(true);
      }else{
        console.log('false');
       
        setcheckTC(false);
      }
      
    });
  };

  const handleImagePick = () => {
    let options = {
      storageOptions: {
        path: "image"
      }
    }
    ImagePicker.launchImageLibrary(options, responce => {
      //console.log(responce);
      if (!responce.didCancel) {
        
        setButtonBackgroundImage(responce.assets[0].uri)
      }

      //console.log(responce.assets[0].uri);
    })
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <Formik
      initialValues={{
        fullName: '',
        selectedCountry: '',
        selectedCity: '',
        identityNumber: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        kvkkAccepted: false,
        buttonBackgroundImage:'',
        password:''
      }}
      onSubmit={values => {
        navigation.navigate('JobScreen', { formData: values });
      }}
    >

      {({ handleChange, handleSubmit, values }) => (
        
        <ScrollView contentContainerStyle={styles.container}>


          <Modal
            visible={loading}
            transparent={true}
            animationType="fade"
          >
            <View style={styles.modalContainer}>
              <ActivityIndicator size="large" color="#8A2BE2" />
            </View>
          </Modal>


          <TouchableOpacity onPress={handleImagePick}>
            <Image
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: 'black',
              }}
              source={
                buttonBackgroundImage ? { uri: buttonBackgroundImage } :require('../../assets/images.jpg')
                }
              marginBottom={20}
            >

            </Image>
          </TouchableOpacity>
        
          

          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={fullName}
            onChangeText={setFullName}
          />




          <TextInput
            style={styles.input}
            placeholder="T.C. Kimlik No"
            value={identityNumber}
            onChangeText={setIdentityNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Şifre"
            secureTextEntry
            value={password}
            onChangeText={setpassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefon Numarası"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <View style={styles.input}>
            {showPicker && (
              <DateTimePicker
                mode='date'
                display='spinner'
                value={date}
                onChange={onChange}
              />
            )}
            {!showPicker && (
              <Pressable
                onPress={toggleDatepicker}
              >
                <TextInput
                  placeholder="yyyy-MM-dd"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  editable={false}
                  placeholderTextColor={'black'}

                />
              </Pressable>
            )}
          </View>

          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => handleCountryChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Ülke Seçin" value="" />
            {countries.map((country, index) => (
              <Picker.Item
                key={index}
                label={country.name.common}
                value={country.cca2}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="İl Seçin" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>

          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Cinsiyet Seçin" value="" />
            <Picker.Item label="Erkek" value="Erkek" />
            <Picker.Item label="Kadın" value="Kadın" />
          </Picker>

          <View style={styles.kvkkContainer}>
            <TouchableOpacity
              onPress={() => setKvkkAccepted(!kvkkAccepted)}
              style={styles.kvkkCheckbox}
            >
              {kvkkAccepted ? (
                <Text style={styles.kvkkCheckboxText}>✓</Text>
              ) : null}
            </TouchableOpacity>
            <Text style={styles.kvkkText}>
              KVKK Onayı veriyorum.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              console.log(buttonBackgroundImage);
              if (
                fullName === '' ||
                selectedCountry === '' ||
                selectedCity === '' ||
                identityNumber === '' ||
                phoneNumber === '' ||
                dateOfBirth === '' ||
                gender === '' ||
                password === ''
              ) {
                alert('Lütfen tüm bilgileri doldurun !');
              }
              else if (!kvkkAccepted) {
                alert('Lütfen KVKK Onayı Veriniz!');
              }            
              else {
                values.fullName = fullName;
                values.selectedCountry = selectedCountry;
                values.selectedCity = selectedCity;
                values.gender = gender;
                values.identityNumber = identityNumber;
                values.kvkkAccepted = kvkkAccepted;
                values.dateOfBirth = dateOfBirth;
                values.phoneNumber = phoneNumber;
                values.buttonBackgroundImage=buttonBackgroundImage;
                values.password=password;
                checkIfUserExists(identityNumber)
                if(checkTC)
                {
                  alert('Bu TC ile başka bir Kayıt Var!');
                }else{
                  handleSubmit();
                }
                
              }
            }}
          >
            <Text style={styles.buttonText}>ileri</Text>
          </TouchableOpacity>



        </ScrollView>
      )}
    </Formik>
    </KeyboardAvoidingView>
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  kvkkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  kvkkCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  kvkkCheckboxText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  kvkkText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageButton: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dateButtonContainer: {
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

});

export default RegisterScreen;