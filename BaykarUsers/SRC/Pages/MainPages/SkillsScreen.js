import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SkillsTable from '../../SqLite/SkillsTable';
import UserStaticData from '../../Models/UserStaticData';

function SkillsScreen({ route }) {
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    SkillsTable.getUserSkillsList(UserStaticData.id, (skills) => {
      setSkillsList(skills);
    });
  }, [UserStaticData.id]);

  const renderSkillItem = ({ item }) => (
    <View style={styles.skillItem}>
      <Text style={styles.skillName}>{item.skillName}</Text>
      <Text style={styles.skillLevel}>{item.skillLevel}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcının Yetenekleri</Text>
      <FlatList
        data={skillsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSkillItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8A2BE2',
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  skillLevel: {
    fontSize: 16,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
});

export default SkillsScreen;
