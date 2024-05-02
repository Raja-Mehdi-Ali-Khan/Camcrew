import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfWeek, getDay, parse } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const events = [
  {
    title: "Big Meeting",
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
    color: "red",
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
    color: "green",
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
    color: "blue",
  },
];

function RCalendar() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "purple",
  });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="bg-white text-center">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <select
          value={newEvent.color}
          onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
          style={{ marginLeft: "10px" }}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
        </select>
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        tileContent={({ date }) => {
          const eventsForDay = allEvents.filter(
            (event) => event.start.toDateString() === date.toDateString()
          );
          return eventsForDay.map((event, index) => (
            <div key={index} style={{ backgroundColor: event.color }}>
              {event.title}
            </div>
          ));
        }}
        locales={locales}
        formatDay={(locale, date) => format(date, "dd", { locale })}
        formatMonthYear={(locale, date) =>
          format(date, "MMMM yyyy", { locale })
        }
        tileClassName={({ date }) => {
          const eventsForDay = allEvents.filter(
            (event) => event.start.toDateString() === date.toDateString()
          );
          return eventsForDay.length > 0 ? "event-date" : null;
        }}
        value={new Date()}
        onChange={(date) => console.log(date)}
      />
    </div>
  );
}

export default RCalendar;
