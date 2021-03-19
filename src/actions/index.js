import axios from 'axios';

export const LOAD_SMURFS = "LOAD_SMURFS"
export const DISPLAY_SMURFS = "DISPLAY_SMURFS"
export const MISSING_SMURFS = "MISSING_SMURFS"
export const ADD_SMURF = "ADD_SMURF"
export const REMOVE_SMURF = "REMOVE_SMURF"

export const fetchSmurfs = () => {
    return dispatch => {
        dispatch({type: LOAD_SMURFS})

        axios.get("http://localhost:3333/smurfs")
        .then(res => {
            dispatch({type: DISPLAY_SMURFS, payload: res.data})
        })
        .catch(error => {
            dispatch({type: MISSING_SMURFS, payload: error.Response.code})
        })
    }
}

const newSmurf = []

export const addSmurf = smurf => {
    return dispatch => {
        dispatch({type:ADD_SMURF})
        axios.post("http://localhost:3333/smurfs", smurf)
        .then(res => {
            dispatch({type: ADD_SMURF, payload: res.data})
        })
        .catch(err => {
            console.log(`Get out of Smurfville ${err}`)
        })
    }
}

export const removeSmurf = smurf => {
    return {
        type: REMOVE_SMURF,
        payload: smurf
    }
}

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.