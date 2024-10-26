import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/chat-context";
import useFormValidation from "../../hooks/useFormValidation";
import Errors from "../commons/Errors";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const chatCtx = useContext(ChatContext);

  const [formIsValid, formError] = useFormValidation(username, room);

  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid || formError) {
      return;
    }

    chatCtx.updateCurrentUser(username);
    // query string
    return navigate(`/chat?room=${room}`);
  };
  return (
    <section>
      <div className="row">
        <h1 className="text-center my-5"> Login to get started</h1>

        <div className="col-md-3"></div>
        <div className="col-md-6">
          {formError && <Errors errorMessage={formError} />}
          <form onSubmit={formSubmitHandler}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="Enter Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <select
                className="form-control"
                onChange={(event) => setRoom(event.target.value)}
              >
                <option></option>
                <option>Relationship</option>
                <option>Sport</option>
                <option>Tech</option>
              </select>
            </div>

            <div className="form-group">
              <input
                className={`form-control btn btn-secondary ${
                  !formIsValid && "disabled"
                }`}
                type="submit"
                value="Join Room"
              />
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </section>
  );
};
export default LoginForm;
