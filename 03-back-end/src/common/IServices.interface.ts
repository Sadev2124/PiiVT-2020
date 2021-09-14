import SubjectService from "../components/subject/service";
import UserService from '../components/user/service';

export default interface IServices {
    subjectService: SubjectService;
    userService: UserService;
}