import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import UserStaticData from '../../Models/UserStaticData';

function ProfileScreen({ route }) {
  const { user } = route.params;
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+user.photoB64);
  UserStaticData.id =user.id;
  const handleOpenCV = () => {
    console.log(user.cvPath);
    Linking.openURL(user.cvPath);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.photoB64 }} style={styles.profileImage} />
      </View>

      <TouchableOpacity style={styles.cvButton} onPress={handleOpenCV}>
        <Text style={styles.cvButtonText}>CV Görüntüle</Text>
      </TouchableOpacity>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Ad Soyad:</Text>
        <Text style={styles.infoValue}>{user.fullName}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>T.C. Kimlik No:</Text>
        <Text style={styles.infoValue}>{user.identityNumber}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Meslek:</Text>
        <Text style={styles.infoValue}>{user.job}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Şifre:</Text>
        <Text style={styles.infoValue}>{"*****"}</Text>
      </View>

     

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Doğum Tarihi:</Text>
        <Text style={styles.infoValue}>{user.birth}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Cinsiyet:</Text>
        <Text style={styles.infoValue}>{user.gender}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>İlçe:</Text>
        <Text style={styles.infoValue}>{user.city}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Çalışma Durumu:</Text>
        <Text style={styles.infoValue}>{user.workState}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Okul:</Text>
        <Text style={styles.infoValue}>{user.schoolName}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.infoLabel}>Bölüm:</Text>
        <Text style={styles.infoValue}>{user.department}</Text>
        </View>

      {/* Diğer bilgileri benzer şekilde listele */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A2BE2', // Mor renk
  },
  infoValue: {
    fontSize: 18,
    color: '#333333', // Koyu gri renk
    marginBottom: 10,
  },
  cvButton: {
    backgroundColor: '#8A2BE2',
    marginVertical: 20,
    marginHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cvButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
