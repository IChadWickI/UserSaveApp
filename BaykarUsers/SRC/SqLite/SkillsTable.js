import db from './database';
import SkillModel from '../Models/SkillModel';

const SkillsTable = {
  createTable() {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS skills (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          skillName TEXT,
          skillLevel TEXT,
          FOREIGN KEY (userId) REFERENCES users (id)
        )`
      );
    });
  },

  insertSkill(skill) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO skills (userId, skillName, skillLevel) VALUES (?, ?, ?)`,
        [skill.userId, skill.skillName, skill.skillLevel]
      );
    });
  },

  insertSkillNotModel(userId, skillName, skillLevel) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO skills (userId, skillName, skillLevel) VALUES (?, ?, ?)`,
        [userId, skillName, skillLevel]
      );
    });
  },

  getUserSkills(userId, callback) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM skills WHERE userId = ?',
        [userId],
        (_, result) => {
          const skills = [];

          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            const skill = new SkillModel(
              row.id,
              row.userId,
              row.skillName,
              row.skillLevel
            );
            skills.push(skill);
          }

          callback(skills);
        }
      );
    });
  },

  getUserSkillsList(userId, callback) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM skills WHERE userId = ?',
        [userId],
        (_, result) => {
          const skillsList = [];
  
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            skillsList.push({
              id: row.id,
              userId: row.userId,
              skillName: row.skillName,
              skillLevel: row.skillLevel,
            });
          }
  
          callback(skillsList);
        }
      );
    });
  },
  

};

export default SkillsTable;
