import db from './database';
import UserModel from '../Models/UserModel';

const UsersTable = {

  
    createTable() {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT,
            photoB64 TEXT,
            identityNumber TEXT,
            password TEXT,
            city TEXT,
            country TEXT,
            birth TEXT,
            gender TEXT,
            workState TEXT,
            kvkkState INTEGER,
            job TEXT,
            educationLevel TEXT,
            schoolName TEXT,
            graduationDate TEXT,
            department TEXT,
            cvPath TEXT
          )`
        );
      });
    },

    insertUser(user, callback) {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO users (
            fullName, photoB64, identityNumber, password, city, country,birth,
            gender, workState, kvkkState, job, educationLevel,
            schoolName, graduationDate, department, cvPath
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
          [
            user.fullName,
            user.photoB64,
            user.identityNumber,
            user.password,
            user.city,
            user.country,
            user.birth,
            user.gender,
            user.workState,
            user.kvkkState,
            user.job,
            user.educationLevel,
            user.schoolName,
            user.graduationDate,
            user.department,
            user.cvPath
          ],
          (_, result) => {
            // Burada result.insertId, eklenen kaydın ID'sini içerir
            const insertedUserId = result.insertId;
            callback(insertedUserId); // ID'yi callback ile dönüyoruz
          }
        );
      });
    },

    getAllUsers(callback) {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM users', [], (_, result) => {
          const users = [];
  
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
  
            const user = new UserModel(
              row.id,
              row.fullName,
              row.photoB64,
              row.identityNumber,
              row.password,
              row.city,
              row.country,
              row.birth,
              row.gender,
              row.workState,
              row.kvkkState,
              row.job,
              row.educationLevel,
              row.schoolName,
              row.graduationDate,
              row.department,
              row.cvPath
            );
  
            users.push(user);
          }
  
          callback(users);
        });
      });
    },
   


    
    getUserByIdentityNumber(identityNumber, callback) {
      db.transaction((txn) => {
        txn.executeSql(
          'SELECT * FROM users WHERE identityNumber = ?',
          [identityNumber],
          (_, result) => {
            //console.log(result.rows.item(0));
            if (result.rows.length > 0) {
              //const row = result.rows.item(0);
              //console.log(row);
             // const user = this.createUserFromRow(row); // Yeniden kullanılabilir bir fonksiyon
              callback(result.rows.item(0));
              //console.log(user);
            } else {
              //console.log("Kullanıcı bulunamadı");
              callback(null); // Kullanıcı bulunamadı
            }
          }
        );
      });
    },
  
    
    
};

export default UsersTable;