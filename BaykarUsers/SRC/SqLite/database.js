import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'myApp.db', location: 'default' },() => {
    console.log('başarılı')
}, (err) => {
    console.log('hata')
}
);

export default db;