import BasePage from "../BasePage/BasePage";
import StudentService from '../../services/StudentService';

export default class HomePageStudent extends BasePage<{}> {
    renderMain(): JSX.Element {
        const testStudentId = StudentService.getStudentIdByUsername("sTeodorSavic");
        testStudentId.then(id => {
            console.log(id);
        })

        
        return (
            <div>
                <p>Student</p>
                <button onClick={this.logout}>Show subjects</button>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }

    logout = () => {
        localStorage.clear();
        window.location.pathname = "/user/login"; 
      }
}