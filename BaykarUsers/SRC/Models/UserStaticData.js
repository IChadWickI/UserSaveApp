class UserStaticData {
    static id = "";
    static fullName = "";
    static photoB64 = "";
    static identityNumber = "";
    static password = "";
    static city = "";
    static country = "";
    static birth = "";
    static gender = "";
    static workState = "";
    static kvkkState = "";
    static job = "";
    static educationLevel = "";
    static schoolName = "";
    static graduationDate = "";
    static department = "";
    static cvPath = "";
  
    static updateData(data) {
      for (const key in data) {
        if (key in UserStaticData) {
          UserStaticData[key] = data[key];
        }
      }
    }
  }
  
  export default UserStaticData;
  