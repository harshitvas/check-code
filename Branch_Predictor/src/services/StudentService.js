import axios from "axios";

const STUDENT_API_BASE_URL =
  "http://localhost:8080/api/v1/student-registration/add-student-details";

class EmployeeService {
  addStudentDetails(student) {
    return axios.post(STUDENT_API_BASE_URL, student);
  }
}

export default new EmployeeService();
