import SubjectService from "../components/subject/service";
import UserService from '../components/user/service';
import ProfessorService from '../components/professor/service';
import StudentService from '../components/student/service';
import MarkService from '../components/mark/service';

export default interface IServices {
    subjectService: SubjectService;
    userService: UserService;
    professorService: ProfessorService;
    studentService: StudentService;
    markService: MarkService;
}