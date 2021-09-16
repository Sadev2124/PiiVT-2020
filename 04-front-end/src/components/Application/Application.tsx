import React from 'react';
import { Container } from 'react-bootstrap';
import './Application.sass';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EventRegister from '../../api/EventRegister';
import api from '../../api/api';
import UserLogin from '../User/UserLogin';
import { Redirect } from 'react-router-dom';
import HomePageProfessor from '../HomePageProfessor/HomePageProfessor';
import HomePageStudent from '../HomePageStudent/HomePageStudent';
class ApplicationState {
  authorizedRole: "user" | "visitor" = "visitor";
}

export default class Application extends React.Component {
  state: ApplicationState;

  constructor(props: any) {
    super(props);

    this.state = {
      authorizedRole: "visitor",
    };
  }

  componentDidMount() {
    EventRegister.on("AUTH_EVENT", this.authEventHandler.bind(this));

    this.checkRole("user");
  }

  componentWillUnmount() {
    EventRegister.off("AUTH_EVENT", this.authEventHandler.bind(this));
  }

  private authEventHandler(message: string) {
    console.log('Application: authEventHandler: ', message);

    if (message === "force_login" || message === "user_logout") {
      return this.setState({ authorizedRole: "visitor" });
    }

    if (message === "user_login") {
      return this.setState({ authorizedRole: "user" });
    }
  }

  private checkRole(role: "user") {
    api("get", "/auth/" + role + "/ok", role)
      .then(res => {
        if (res?.data === "OK") {
          this.setState({
            authorizedRole: role,
          });
          EventRegister.emit("AUTH_EVENT", role + "_login");
        }
      })
      .catch(() => {});
  }

  render() {
    return (
      <BrowserRouter>
        <Container className="Application">
          <div className="Application-header">
            Front-end aplikacije
          </div>         

          <div className="Application-body">
            <Switch>
              <Route path="/user/login" component={UserLogin} />
              <Route path="/user/professor" component={HomePageProfessor} />
              <Route path="/user/student" component={HomePageStudent} />
              <Redirect to="/user/login"/>
            </Switch>
          </div>

          <div>
              &copy; 2021...
          </div>
        </Container>
      </BrowserRouter>
    );
  }
}
