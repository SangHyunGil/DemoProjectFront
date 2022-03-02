import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import MuiDialog from "../Modal/MuiDialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import MuiTimePicker from "../MuiPicker/MuiTimePicker";
import { useQueryClient, useMutation, useQuery } from "react-query";
import {
  getStudySchedule,
  createStudySchedule,
  updateStudySchedule,
  deleteStudySchedule
} from "../../Api/Api";
import { useParams } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

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

const TimePickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 330px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
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

const MonthEvent = ({ event }) => {
  //console.log(event);
  return (
    <>
      <p>{`${event.title} ${moment(event?.startTime).format("hh:mm a")}~
        ${moment(event?.endTime).format("hh:mm a")}`}</p>
    </>
  );
};
//padstart

function StudyCalendar() {
  const [events, setEvents] = useState([]);

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
    },
  });
  const {
    register: ChangeRegister,
    handleSubmit: ChangeHandleSubmit,
    setValue: ChangeSetValue,
    control: ChangeControl,
  } = useForm();
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [isNewContent, setIsNewContent] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDate, setNewDate] = useState({});
  const [currentDate, setCurrentDate] = useState({ id: 0 });
  const [currentTime, setCurrentTime] = useState({
    startTime: "",
    endTime: "",
  });
  const queryClient = useQueryClient();
  const { studyId } = useParams();
  const { data: studySchedule } = useQuery(
    ["getStudySchedule", studyId],
    () => getStudySchedule(studyId, getCookie("accessToken")),
    {
      select: (data) => data.data.data,
      onSuccess: (data) => {
        setEvents(data);
      },
    }
  );

  const CreateScheduleMutation = useMutation(
    (data) => createStudySchedule(studyId, data, getCookie("accessToken")),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getStudySchedule", studyId]);
      },
    }
  );

  const updateScheduleMutation = useMutation(
    ({ data, scheduleId }) =>
      updateStudySchedule(studyId, scheduleId, data, getCookie("accessToken")),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getStudySchedule", studyId]);
      },
    }
  );

  const deleteScheduleMutation = useMutation(
    (scheduleId) => deleteStudySchedule(studyId, scheduleId, getCookie("accessToken")),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getStudySchedule", studyId]);
      },
    }
  );

  const onEventResize = (data) => {
    const { event, start, end } = data;
    const MovedEvent = events.find((e) => e.id === event.id);
    updateScheduleMutation.mutate({
      data: {
        ...MovedEvent,
        start: start + "",
        end: end + "",
      },
      scheduleId: event.id,
    });
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
  const onDropFromOutside = ({ start, end }) => {
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
    };
    setDraggedEvent(null);
    moveEvent({ event, start, end });
  };

  const moveEvent = ({ event, start, end }) => {
    //console.log(event);
    console.log('dragged')
    const MovedEvent = events.find((e) => e.id === event.id);
    updateScheduleMutation.mutate({
      data: {
        ...MovedEvent,
        start: start + "",
        end: end + "",
      },
      scheduleId: event.id,
    });
    //console.log(nextEvents);
    //setEvents(nextEvents);
  };

  const onSubmit = (data) => {
    console.log(data);
    /*
    setEvents((e) => [
      ...e,
      {
        start: newDate?.start,
        end: newDate?.end,
        title: data.newEvent,
        id: events.length,
        allDay: false,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    ]);*/
    CreateScheduleMutation.mutate({
      start: newDate?.start + "",
      end: newDate?.end + "",
      title: data.newEvent,
      id: events.length,
      startTime: data.startTime + "",
      endTime: data.endTime + "",
    });
    setValue("newEvent", "");
  };

  const onChangeSubmit = (data) => {
    /*
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === currentDate.id
        ? {
            ...existingEvent,
            title: data.defaultEvent,
            startTime: data.startTime + "",
            endTime: data.endTime + "",
          }
        : existingEvent;
    });*/
    const ChangedEvent = events.find((event) => event.id === currentDate.id);
    updateScheduleMutation.mutate({
      data: {
        ...ChangedEvent,
        title: data.defaultEvent,
        startTime: data.startTime + "",
        endTime: data.endTime + "",
      },
      scheduleId: currentDate.id,
    });
    //setEvents(nextEvents);
    ChangeSetValue("changeEvent", "");
  };

  const onEventClickHanlder = (event) => {
    console.log(event);
    const { title, id } = event;
    setIsNewContent(false);
    ChangeSetValue("defaultEvent", title);
    setIsCreateModalOpen(true);
    setCurrentDate({ id });
    ChangeSetValue("startTime", event.startTime);
    ChangeSetValue("endTime", event.endTime);
  };

  const onEventDeleteHanlder = () => {
    //console.log(currentDate);
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deleteScheduleMutation.mutate(currentDate.id);
      setIsCreateModalOpen(false);
    }
  };

  return (
    <CalendarWrapper>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        views={["month"]}
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
          month: {
            event: MonthEvent,
          },
        }}
      />
      <MuiDialog
        open={isCreateModalOpen}
        title={isNewContent ? "새로운 일정 입력" : "기존 일정"}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <form
          onSubmit={
            isNewContent
              ? handleSubmit(onSubmit)
              : ChangeHandleSubmit(onChangeSubmit)
          }
        >
          <DialogContent>
            <DialogContentText>
              {isNewContent
                ? "새로운 일정을 입력해 주세요!"
                : "기존 일정입니다"}
            </DialogContentText>
            {isNewContent ? (
              <TextField
                {...register("newEvent", { required: "일정을 입력해 주세요!" })}
                fullWidth
                autoFocus
                margin="dense"
                label="일정 입력"
                variant="standard"
              />
            ) : (
              <TextField
                {...ChangeRegister("defaultEvent", {
                  required: "수정할 일정을 입력해 주세요!",
                })}
                fullWidth
                autoFocus
                margin="dense"
                label="기존 일정"
                variant="standard"
              />
            )}
            <TimePickerWrapper>
              <MuiTimePicker
                name="startTime"
                control={isNewContent ? control : ChangeControl}
                setValue={isNewContent ? setValue : ChangeSetValue}
              />
              <MuiTimePicker
                name="endTime"
                control={isNewContent ? control : ChangeControl}
                setValue={isNewContent ? setValue : ChangeSetValue}
              />
            </TimePickerWrapper>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              확인
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setValue("newEvent", "");
              }}
              color="primary"
            >
              취소
            </Button>
            {!isNewContent && <Button
              type="button"
              color="error"
              onClick={onEventDeleteHanlder}
            >
              삭제
            </Button>}
          </DialogActions>
        </form>
      </MuiDialog>
    </CalendarWrapper>
  );
}

export default StudyCalendar;
