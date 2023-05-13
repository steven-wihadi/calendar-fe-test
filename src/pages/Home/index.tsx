import { useState } from "react";
import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import "./style.scss";
import { makeOnlyNum } from "../../utils/number";
import EventList from "./EventList";

let indexFlagEvent = 0;
let modalProcedure = "add";

const Home = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [eventDay, setEventDay] = useState<any>([]);
  const [isShowModalEvent, setIsShowModalEvent] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("");
  const [inputHour, setInputHour] = useState<string>("");
  const [inputMinute, setInputMinute] = useState<string>("");
  const [meridiem, setMeridiem] = useState<"am" | "pm">("am");
  const [email, setEmail] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);

  const convertDateToString = (date = selectedDay) => {
    let result = "";

    result += date.getDate();
    const month = date.getMonth() + 1;
    result += `-${month < 10 ? "0" + month : month}`;
    result += `-${date.getFullYear()}`;

    return result;
  };

  const onClickDay = (e: Date) => {
    setSelectedDay(e);

    let eventList: any = localStorage.getItem("event");
    if (!eventList) {
      setEventDay([]);
    } else {
      eventList = JSON.parse(eventList);

      setEventDay(
        eventList[convertDateToString(e)]
          ? eventList[convertDateToString(e)]
          : []
      );
    }
  };

  const onChangeInputNum = (
    e: any,
    max: number,
    setter: (val: string) => void
  ) => {
    const { value } = e.target;
    const num = makeOnlyNum(value);
    if (Number(num) > max) {
      e.preventDefault();
      return;
    }
    setter(num);
  };

  const onAddInvitess = () => {
    const temp = JSON.parse(JSON.stringify(invitees));
    temp.push(email);
    setInvitees(temp);
    setEmail("");
  };

  const onDeleteInvitess = (index: number) => {
    const temp = JSON.parse(JSON.stringify(invitees));
    temp.splice(index, 1);
    setInvitees(temp);
  };

  const onSubmit = () => {
    const color = "red";
    const event = {
      eventName,
      inputHour,
      inputMinute,
      meridiem,
      invitees,
      color,
    };

    let eventList: any = localStorage.getItem("event");
    if (!eventList) {
      eventList = {};
    } else {
      eventList = JSON.parse(eventList);
    }

    switch (modalProcedure) {
      case "add":
        if (!eventList[convertDateToString()]) {
          eventList[convertDateToString()] = [];
        }
        eventList[convertDateToString()].push(event);
        break;
      case "edit":
        eventList[convertDateToString()][indexFlagEvent] = event;
        break;
    }

    localStorage.setItem("event", JSON.stringify(eventList));
    setIsShowModalEvent(false);
    setEventDay(eventList[convertDateToString()]);
  };

  const onClickEvent = (procedure: "edit" | "add" = "add", index = 0) => {
    setEventName(procedure === "add" ? "" : eventDay[index].eventName);
    setInputHour(procedure === "add" ? "" : eventDay[index].inputHour);
    setInputMinute(procedure === "add" ? "" : eventDay[index].inputMinute);
    setMeridiem(procedure === "add" ? "am" : eventDay[index].meridiem);
    setEmail("");
    setInvitees(procedure === "add" ? [] : eventDay[index].invitees);

    modalProcedure = procedure;
    indexFlagEvent = index;
    setIsShowModalEvent(true);
  };

  return (
    <div className="home-page-wrapper">
      <Calendar onClickDay={onClickDay} />

      <EventList
        eventDay={eventDay}
        onClickAddEvent={() => onClickEvent("add")}
        onClickEventItem={(index: number) => onClickEvent("edit", index)}
      />

      <Modal
        isShow={isShowModalEvent}
        onClose={() => setIsShowModalEvent(false)}
      >
        <div className="event-form-wrapper">
          <h3>Date {convertDateToString()}</h3>

          <div className="form-wrapper">
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />

            <label>Event Time</label>
            <div className="input-time-wrapper">
              <input
                type="text"
                value={inputHour}
                onChange={(e: any) => onChangeInputNum(e, 12, setInputHour)}
              />
              <span className="time-separator">:</span>
              <input
                type="text"
                value={inputMinute}
                onChange={(e: any) => onChangeInputNum(e, 59, setInputMinute)}
              />

              <select
                value={meridiem}
                onChange={(e: any) => setMeridiem(e.target.value)}
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>

            <label>Invitees</label>
            <div className="invitees-wrapper">
              <input
                type="text"
                placeholder="Type your budy email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={onAddInvitess}>Add Email</button>

              <div className="invitees-list">
                {invitees.map((email, index) => (
                  <div className="invitees-item" key={index}>
                    {email}{" "}
                    <button onClick={() => onDeleteInvitess(index)}>
                      remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="submit-button"
              onClick={onSubmit}
              disabled={!eventName || !inputHour || !inputMinute}
            >
              {modalProcedure} event
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
