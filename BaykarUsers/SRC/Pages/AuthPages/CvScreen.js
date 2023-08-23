import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import UserModel from '../../Models/UserModel';
import UsersTable from '../../SqLite/UsersTable';
import UserProjectsTable from '../../SqLite/UserProjectsTable';
import SkillsTable from '../../SqLite/SkillsTable';

function CVScreen({ route, navigation }) {
    const { formData, jobData, educationData, skillData } = route.params;
    const [cvFile, setCvFile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleAddProject = () => {
        if (newProject.title && newProject.description) {
            setProjects([...projects, newProject]);
            setNewProject({
                title: '',
                description: '',
            });
        }
    };

    const handleDeleteProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    const handleChooseCV = async () => {
        try {
            const docs = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf], // Sadece PDF dosyalarını kabul et
            });

            if (docs.length > 0) {
                const doc = docs[0]; // İlk seçilen dosyayı alıyoruz

                // Dosya bilgilerini saklayın
                const cvFileInfo = {
                    uri: doc.uri,
                    name: doc.name,
                    type: doc.type,
                };

                console.log(cvFileInfo);
                setCvFile(cvFileInfo);
            }

        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                // Kullanıcı dosya seçme işleminden vazgeçti
                console.log("Canceled", error);
            } else {
                console.log(error);
            }
        }
    };

    const handleSubmit = () => {
        // Verileri kaydetme veya işlem yapma
        console.log(formData);
        SaveUsers();

        //navigation.navigate('SonrakiEkran');
    };

    const SaveUsers = () => {

        try {
            
            setIsLoading(true);

            const user = createUserModel();
            console.log(user);
            //saveUser();
            //console.log(projects);
            
            UsersTable.insertUser(user, (insertedUserId) => {
                // Eklendikten sonra çalışacak kod burada
                console.log('Inserted user ID:', insertedUserId);


                // Projeleri kaydet
                projects.forEach((project) => {
                    
                    UserProjectsTable.insertUserProjectNotModel(
                        insertedUserId,
                        project.title,
                        project.description
                    );
                });


                skillData.skills.forEach((skill) => {
                    
                    SkillsTable.insertSkillNotModel(insertedUserId, skill.skill, skill.level);
                });




            });

            setIsLoading(false);
            navigation.navigate('Home');


        } catch (error) {
            setIsLoading(false);
            console.error("Kullanıcı Kayıt Edilemedi:", error);
        }


    };

    


    const createUserModel = () => {
        const user = new UserModel();
        user.fullName = formData.fullName;
        user.photoB64 = formData.buttonBackgroundImage; 
        user.identityNumber = formData.identityNumber;
        user.password = formData.password;
        user.birth = formData.dateOfBirth;
        user.city = formData.selectedCity;
        user.country = formData.selectedCountry;
        user.gender = formData.gender;
        user.workState = jobData.employmentStatus;
        user.kvkkState = 1;
        user.job = jobData.job;
        user.educationLevel = educationData.educationLevel;
        user.schoolName = educationData.schoolName;
        user.graduationDate = educationData.graduationYear;
        user.department = educationData.department;
        user.cvPath = cvFile ? cvFile.uri : ''; // Eğer cvFile varsa uri'si, yoksa boş string

        return user;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>CV Yükle</Text>
            <Text >Lütfen PDF Formatında CV'nizi Yükleyiniz.</Text>

            <TouchableOpacity style={styles.uploadButton} onPress={handleChooseCV}>
                <Text style={styles.CVText} marginTop={20}>PDF Seç ve Yükle</Text>
            </TouchableOpacity>
            {cvFile && (
                <Text>Yüklenen PDF: {cvFile.name}</Text>
            )}

            <Modal
                visible={isLoading}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <ActivityIndicator size="large" color="#8A2BE2" />
                </View>
            </Modal>

            <Text style={styles.title}>Projeler</Text>
            <View style={styles.projectInputContainer}>
                <TextInput
                    style={styles.projectInput}
                    placeholder="Proje Başlığı"
                    value={newProject.title}
                    onChangeText={(text) => setNewProject({ ...newProject, title: text })}
                />
                <TextInput
                    style={styles.projectInput}
                    placeholder="Proje Açıklaması"
                    value={newProject.description}
                    onChangeText={(text) => setNewProject({ ...newProject, description: text })}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Ekle</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.projectList}>
                {projects.map((project, index) => (
                    <View key={index} style={styles.projectItem}>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                        <Text style={styles.projectDescription}>{project.description}</Text>
                        <TouchableOpacity onPress={() => handleDeleteProject(index)}>
                            <Text style={styles.deleteButton}>Sil</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Kayıdı Tamamla</Text>
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
    deleteButton: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 10,
    },
    nextButton: {
        backgroundColor: '#8A2BE2',
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8A2BE2',
        marginBottom: 20,
        marginTop: 20,
    },
    projectInputContainer: {
        marginBottom: 20,
    },
    projectInput: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#8A2BE2',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#8A2BE2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    CVText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    projectList: {
        width: '80%',
    },
    projectItem: {
        borderWidth: 1,
        borderColor: '#8A2BE2',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingVertical: 5,
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    projectDescription: {
        fontSize: 16,
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default CVScreen;
