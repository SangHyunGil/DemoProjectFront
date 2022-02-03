import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import styled from "styled-components";
import { Button, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import MuiDialog from "../Modal/MuiDialog";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

moment.locale("ko-KR");
const localizer = momentLocalizer(moment); // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarWrapper = styled.div`
  height: 80vh;
  .rbc-btn-group {
    display: flex;
    flex-direction: column;
    font-family: "OTWelcomeBA", sans-serif;
    .rbc-toolbar-label-wrapper {
        display: flex;
        justify-content: center;
        margin: 10px 0;
        .rbc-toolbar-label {
            font-size: 2rem;
        }
    }
    .rbc-toolbar-button-wrapper {
        display: flex;
        button {
            &:nth-child(2) {
                margin: 0 10px;
            }
        }
    }
  }
`;

const Toolbar = (props) => {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <div className="rbc-toolbar-label-wrapper">
          <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
            date.getMonth() + 1
          }월`}</span>
        </div>
        <div className="rbc-toolbar-button-wrapper">
          <button type="button" onClick={navigate.bind(null, "PREV")}>
            이전
          </button>
          <button type="button" onClick={navigate.bind(null, "TODAY")}>
            이번달
          </button>
          <button type="button" onClick={navigate.bind(null, "NEXT")}>
            다음
          </button>
        </div>
      </span>
    </div>
  );
};

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
  const { register, handleSubmit, setValue } = useForm();
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [isNewContent, setIsNewContent] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDate, setNewDate] = useState({});
  const [currentDate, setCurrentDate] = useState({ id:0 });

  const onEventResize = (data) => {
    const { event, start, end } = data;
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
  };

  const handleDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleSelect = ({ start, end }) => {
    setIsNewContent(true);
    setIsCreateModalOpen(true);
    setNewDate({ start, end });
    /*
    const title = window.prompt("새로운 일정을 입력해주세요");
    if (title) {
      setEvents((e) => [...e, { start, end, title }]);
    }*/
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
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    //console.log(event);
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });
    //console.log(nextEvents);
    setEvents(nextEvents);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log('submit');
    if(isNewContent)  {
      setEvents((e) => [...e, { start:newDate?.start, end: newDate?.end, title: data.newEvent, id: events.length }]);
      setValue("newEvent", "")
    }
    else {
      const nextEvents = events.map((existingEvent) => {
        return existingEvent.id === currentDate.id
          ? { ...existingEvent, title: data.defaultEvent }
          : existingEvent;
      });
      setEvents(nextEvents);
      setValue("defaultEvent", "");
    }
  };

  const onEventClickHanlder = (event) => {
    console.log(event);
    const {title, id} = event;
    setIsNewContent(false);
    setValue("defaultEvent", title);
    setIsCreateModalOpen(true);
    setCurrentDate({id})
  };

  return (
    <CalendarWrapper>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        localizer={localizer}
        onEventDrop={moveEvent}
        events={events}
        onEventResize={onEventResize}
        resizable
        selectable
        onSelectEvent={onEventClickHanlder}
        onSelectSlot={handleSelect}
        popup={true}
        dragFromOutsideItem={displayDragItemInCell ? draggedEvent : null}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
        components={{
          toolbar: Toolbar,
        }}
      />
      <MuiDialog open={isCreateModalOpen} title={isNewContent? '새로운 일정 입력': '기존 일정' } setOpen={setIsCreateModalOpen} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>{isNewContent ? '새로운 일정을 입력해 주세요!' : '기존 일정입니다'}</DialogContentText>
            {isNewContent ? <TextField 
              {...register('newEvent',{required:'일정을 입력해 주세요!'})}
              fullWidth
              autoFocus
              margin="dense"
              label="일정 입력"
              variant="standard"
            /> : <TextField 
              {...register('defaultEvent',{required:'수정할 일정을 입력해 주세요!'})}
              fullWidth
              autoFocus
              margin="dense"
              label="기존 일정"
              variant="standard"
            />}
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" onClick={()=>setIsCreateModalOpen(false)}>확인</Button>
            <Button type="button" onClick={()=>{
              setIsCreateModalOpen(false)
              setValue("newEvent", "");}
              } color="primary">취소</Button>
          </DialogActions>
        </form>
      </MuiDialog>
    </CalendarWrapper>
  );
}

export default StudyCalendar;
