import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import "./style.scss";
import { makeOnlyNum } from "../../utils/number";
import EventList from "./EventList";
import { convertDateToString } from "../../utils/date";

let indexFlagEvent = 0;
let modalProcedure = "add";

const Home = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [allEvent, setAllEvent] = useState({});
  const [eventDay, setEventDay] = useState<any>([]);
  const [isShowModalEvent, setIsShowModalEvent] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("");
  const [inputHour, setInputHour] = useState<string>("");
  const [inputMinute, setInputMinute] = useState<string>("");
  const [meridiem, setMeridiem] = useState<"am" | "pm">("am");
  const [email, setEmail] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);

  useEffect(() => {
    onClickDay(selectedDay);
    let eventList: any = localStorage.getItem("event");
    setAllEvent(eventList ? JSON.parse(eventList) : {});
  }, []);

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
    const event: any = {
      eventName,
      inputHour,
      inputMinute,
      meridiem,
      invitees,
    };

    let eventList: any = localStorage.getItem("event");
    if (!eventList) {
      eventList = {};
    } else {
      eventList = JSON.parse(eventList);
    }

    switch (modalProcedure) {
      case "add":
        if (!eventList[convertDateToString(selectedDay)]) {
          eventList[convertDateToString(selectedDay)] = [];
        }
        switch (eventList[convertDateToString(selectedDay)].length) {
          case 0:
            event["color"] = "red";
            break;
          case 1:
            event["color"] = "blue";
            break;
          case 2:
            event["color"] = "yellow";
            break;
        }
        eventList[convertDateToString(selectedDay)].push(event);
        setAllEvent(eventList);
        break;
      case "edit":
        event["color"] =
          eventList[convertDateToString(selectedDay)][indexFlagEvent].color;
        eventList[convertDateToString(selectedDay)][indexFlagEvent] = event;
        break;
    }

    localStorage.setItem("event", JSON.stringify(eventList));
    setIsShowModalEvent(false);
    setEventDay(eventList[convertDateToString(selectedDay)]);
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

  const onDeleteEvent = (index: number) => {
    const temp: any = localStorage.getItem("event");
    const eventList = JSON.parse(temp);

    eventList[convertDateToString(selectedDay)].splice(index, 1);
    localStorage.setItem("event", JSON.stringify(eventList));
    setEventDay(eventList[convertDateToString(selectedDay)]);
    setAllEvent(eventList);
  };

  return (
    <div className="home-page-wrapper">
      <Calendar onClickDay={onClickDay} allEvent={allEvent} />

      <EventList
        eventDay={eventDay}
        onClickAddEvent={() => onClickEvent("add")}
        onClickEventItem={(index: number) => onClickEvent("edit", index)}
        onRemoveEventItem={onDeleteEvent}
      />

      <Modal
        isShow={isShowModalEvent}
        onClose={() => setIsShowModalEvent(false)}
      >
        <div className="event-form-wrapper">
          <h3>Date {convertDateToString(selectedDay)}</h3>

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
              {modalProcedure === "add" ? "Add Event" : "Apply Change"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
