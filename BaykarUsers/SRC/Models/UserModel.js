class UserModel {
  constructor(
    id,
    fullName,
    photoB64,
    identityNumber,
    password,
    city,
    country,
    birth,
    gender,
    workState,
    kvkkState,
    job,
    educationLevel,
    schoolName,
    graduationDate,
    department,
    cvPath
  ) {
    this.id = id;
    this.fullName = fullName;
    this.photoB64 = photoB64;
    this.identityNumber = identityNumber;
    this.password = password;
    this.city = city;
    this.country = country;
    this.birth = birth;
    this.gender = gender;
    this.workState = workState;
    this.kvkkState = kvkkState;
    this.job = job;
    this.educationLevel = educationLevel;
    this.schoolName = schoolName;
    this.graduationDate = graduationDate;
    this.department = department;
    this.cvPath = cvPath;
  }
}

export default UserModel;