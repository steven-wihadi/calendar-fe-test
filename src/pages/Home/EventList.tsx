import { FC } from "react";

interface EventListPropTypes {
  eventDay: any;
  onClickAddEvent: () => void;
  onClickEventItem: (index: number) => void;
  onRemoveEventItem: (index: number) => void;
}

const EventList: FC<EventListPropTypes> = ({
  eventDay,
  onClickAddEvent,
  onClickEventItem,
  onRemoveEventItem,
}) => {
  return (
    <div className="event-list-wrapper">
      {!eventDay.length && (
        <div className="empty-event">
          <span>There isn't event in this day</span>
          <button onClick={onClickAddEvent}>Add Event</button>
        </div>
      )}

      {eventDay.length !== 0 && (
        <div className="event-list">
          {eventDay.map((data: any, index: number) => (
            <div
              className="event-item"
              key={index}
              onClick={() => onClickEventItem(index)}
            >
              <div className="dot" style={{ background: data.color }} />
              <div className="event-info">
                <span className="event-name">{data.eventName}</span>
                <span className="event-time">{`${data.inputHour}:${
                  data.inputMinute
                } ${data.meridiem.toLocaleUpperCase()}`}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveEventItem(index);
                }}
              >
                remove
              </button>
            </div>
          ))}

          {eventDay.length < 3 && (
            <button className="add-event-btn" onClick={onClickAddEvent}>
              Add Event
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
