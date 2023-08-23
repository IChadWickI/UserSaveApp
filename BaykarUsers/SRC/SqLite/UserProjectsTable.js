import db from './database';
import UserProjectModel from '../Models/UserProjectModel';

const UserProjectsTable = {
  createTable() {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS user_projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          projectName TEXT,
          projectDescription TEXT,
          FOREIGN KEY (userId) REFERENCES users (id)
        )`
      );
    });
  },

  insertUserProject(userProject) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO user_projects (userId, projectName, projectDescription) VALUES (?, ?, ?)`,
        [userProject.userId, userProject.projectName, userProject.projectDescription]
      );
    });
  },

  insertUserProjectNotModel(userId, projectName, projectDescription) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO user_projects (userId, projectName, projectDescription) VALUES (?, ?, ?)`,
        [userId, projectName, projectDescription]    
        
      );
    });
  },

  getUserProjects(userId, callback) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user_projects WHERE userId = ?',
        [userId],
        (_, result) => {
          const userProjects = [];

          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            const userProject = new UserProjectModel(
              row.id,
              row.userId,
              row.projectName,
              row.projectDescription
            );
            userProjects.push(userProject);
          }

          callback(userProjects);
        }
      );
    });
  },

  // Diğer işlemler buraya eklenebilir
};

export default UserProjectsTable;
