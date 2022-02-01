import React, { useState } from 'react';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from 'moment';
import styled from 'styled-components';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarWrapper = styled.div`
    height: 100vh;
`;

function StudyCalendar() {
    const [events, setEvents] = useState([
        {
            id: 0,
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "스터디 하기",
            allDay: false,
        },
        {
            id: 1,
            start: moment().toDate(),
            end: moment().add(2, "days").toDate(),
            title: "백엔드 스터디",
            allDay: false,
        },
    ]);
    const [draggedEvent, setDraggedEvent] = useState(null);
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);

    const onEventResize = (data) => {
        const {event,start,end} = data;
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
              ? { ...existingEvent, start, end }
              : existingEvent
        });
        setEvents(nextEvents);
    };

    const handleDragStart = (event) => {
        setDraggedEvent(event);
    };

    const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title) {
          setEvents(e=>[...e, { start, end, title }]);
        }
    };

    const onDropFromOutside = ({ start, end, allDay }) => {
        const event = {
            id: draggedEvent.id,
            title: draggedEvent.title,
            start,
            end,
            allDay: allDay,
        };
        setDraggedEvent(null);
        moveEvent({ event, start, end });
    };

    const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        let allDay = event.allDay;
        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }
        console.log(event);
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
              ? { ...existingEvent, start, end, allDay }
              : existingEvent
          });
        console.log(nextEvents);
        setEvents(nextEvents);
    };

  return <CalendarWrapper>
      <DnDCalendar
      defaultDate={moment().toDate()}
      defaultView="month"
      localizer={localizer}
      onEventDrop={moveEvent}
      events={events}
      onEventResize = {onEventResize}
      resizable
      selectable
      onSelectEvent={event => alert(event.title)}
      onSelectSlot={handleSelect}
      popup={true}
      dragFromOutsideItem={
        displayDragItemInCell ? draggedEvent : null
      }
      onDropFromOutside={onDropFromOutside}
      handleDragStart={handleDragStart}
    />
  </CalendarWrapper>;
}

export default StudyCalendar;
