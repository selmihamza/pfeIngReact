const requestSponsorListType = "REQUEST_SPONSORS";
const receiveSponsorListType = "RECEIVE_SPONSORS";
const addInterests = "ADD_INTERESTS";
const initialState = { sponsors: [], isLoading: true };
const sponsors = [
  { name: "LILAS", type: "Couches", place: "Tunis", interests: ["Hachathon", "Contest", "Gaming"]},
  { name: "Orange", type: "Operateur telephonique", place: "Tunis", interests: ["Hachathon", "Contest", "Gaming"] }

];
const currentSponsor="Orange";

export const actionCreators = {
  getSponsors: () => async (dispatch, getState) => {
    dispatch({ type: requestSponsorListType });

    //const url = ``;
    //const response = await fetch(url);
    // const events = await response.json();


    dispatch({ type: receiveSponsorListType, sponsors });
  },
  addInterests: (interest) => async (dispatch, getState) => {
    dispatch({ type: requestSponsorListType });

    //const url = ``;
    //const response = await fetch(url);
    // const events = await response.json();
    sponsors.forEach(s=>{
      if(s.name==currentSponsor){
        s.interests.push(interest.name);
      }
    })

    dispatch({ type: addInterests, sponsors });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestSponsorListType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveSponsorListType) {
    return {
      ...state,
      sponsors: action.sponsors,
      isLoading: false
    };
  }

  if (action.type === addInterests) {
    return {
      ...state,
      sponsors: action.sponsors,
      isLoading: false
    };
  }

  return state;
};
