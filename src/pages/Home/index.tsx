import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import "./style.scss";

let selectedDay: Date;

const Home = () => {
  return (
    <div className="home-page-wrapper">
      <Calendar onClickDay={(e) => (selectedDay = e)} />

      <div className="event-list-wrapper">
        <div className="empty-event">
          <span>There isn't event in this day</span>
          <button>Add Event</button>
        </div>
      </div>

      <Modal isShow>
        <div className="event-form-wrapper">
          <h3>Add Event 12-May-2023</h3>

          <div className="form-wrapper">
            <label>Event Name</label>
            <input type="text" />

            <label>Event Time</label>
            <div className="input-time-wrapper">
              <input type="number" max={12} min={0} />
              <span className="time-separator">:</span>
              <input type="number" />

              <select>
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>

            <label>Invitees</label>
            <div className="invitees-wrapper">
              <input type="text" placeholder="Type your budy email here" />
              <button>Add Email</button>

              <div className="invitees-list">
                <div className="invitees-item">
                  test@email.com <button>remove</button>
                </div>
                <div className="invitees-item">
                  test@email.com <button>remove</button>
                </div>
              </div>
            </div>

            <button className="submit-button">Add event</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
