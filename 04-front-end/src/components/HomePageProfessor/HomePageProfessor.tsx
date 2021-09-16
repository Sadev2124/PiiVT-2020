import BasePage from "../BasePage/BasePage";

export default class HomePageProfessor extends BasePage<{}> {
    renderMain(): JSX.Element {
        return (
            <div>
                <p>Profesor</p>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }

    logout = () => {
        localStorage.clear();
        window.location.pathname = "/user/login"; 
      }
}