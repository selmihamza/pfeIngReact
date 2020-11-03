const requestEventsListType = "REQUEST_EVENTS";
const receiveEventsListType = "RECEIVE_EVENTS";
const AddEventType = "ADD_EVENT";
const EditdEventType = "Edit_EVENT";
const DeleteEventType = "DELETE_EVENT";
const RequestEventType = "REQUEST_EVENT";
const ReceiveEventType = "RECEIVE_EVENT";
const initialState = { events: [], isLoading: true, event: {} };

export const actionCreators = {
  getEvents: () => async (dispatch, getState) => {
    dispatch({ type: requestEventsListType });
    const url = `api/events`;
    const response = await fetch(url);
    const events = await response.json();
    dispatch({ type: receiveEventsListType, events });
  },
  getEvent: id => async (dispatch, getState) => {
    dispatch({ type: RequestEventType, payload: {} });
    const url = `api/events/` + id;
    const response = await fetch(url);
    const event = await response.json();
    dispatch({ type: ReceiveEventType, payload: event });
  },
  addEvent: e => async (dispatch, getState) => {
    dispatch({ type: AddEventType });
    const url = `api/events`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    const event = await response.json();
    dispatch({ type: AddEventType, payload: event });
  },
  editEvent: event => async (dispatch, getState) => {
    dispatch({ type: EditdEventType });
    const url = `api/events/` + event.id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
    //const res = await response.json();
    console.log(response.body);

    dispatch({ type: EditdEventType, payload: response });
  },
  deleteEvent: id => async (dispatch, getState) => {
    dispatch({ type: DeleteEventType });
    const url = `api/events/` + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id)
    });
    const events = await response.json();
    dispatch({ type: DeleteEventType, id });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestEventsListType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveEventsListType) {
    return {
      ...state,
      events: action.events,
      isLoading: false
    };
  }

  if (action.type === AddEventType) {
    return {
      ...state,
      isLoading: false
    };
  }
  if (action.type === RequestEventType) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === ReceiveEventType) {
    return {
      ...state,
      event: action.payload,
      isLoading: false
    };
  }
  if (action.type === DeleteEventType) {
    return {
      ...state,
      events: state.events.filter(event => event.id != action.id),
      isLoading: false
    };
  }

  return state;
};
