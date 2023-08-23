import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import UserProjectsTable from '../../SqLite/UserProjectsTable';
import UserStaticData from '../../Models/UserStaticData';

function UserProjectsScreen({ route, navigation }) {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    // Kullanıcı projelerini çekme işlemi
    UserProjectsTable.getUserProjects(UserStaticData.id, (userProjects) => {
      setProjectList(userProjects);
    });
  }, [UserStaticData.id]);

  const renderItem = ({ item, index }) => (
    <View style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.projectName}</Text>
      <Text style={styles.projectDescription}>{item.projectDescription}</Text>
      <TouchableOpacity onPress={() => handleDeleteProject(index)}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDeleteProject = (index) => {
    // Silme işlemi
    const updatedProjects = [...projectList];
    updatedProjects.splice(index, 1);
    setProjectList(updatedProjects);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proje Listesi</Text>
      <FlatList
        data={projectList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.projectList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddProject()}>
        <Text style={styles.buttonText}>Yeni Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
  },
  projectList: {
    paddingHorizontal: 20,
  },
  projectItem: {
    borderWidth: 1,
    width:350,
    borderColor: '#8A2BE2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2', 
    marginBottom: 5, 
  },
  projectDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'red', 
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default UserProjectsScreen;
