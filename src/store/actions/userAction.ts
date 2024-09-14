import { IGymOwner } from "../../interfaces/IGymOwner";
import {IStaffDetailResponse} from "../../interfaces/IStaffDetail";
import store from "../store";

export const setUserAction = (payload: IGymOwner | null) => {
  store.dispatch({
    type: "SET_USER",
    payload: payload,
  });
};

export const setUserTokenAction = (token: string | null) => {
  store.dispatch({
    type: "SET_TOKEN",
    payload: token,
  });
};

export const setNotificationToken = (token: string) => {
  store.dispatch({
    type: "SET_NOTIFICATION_TOKEN",
    payload: token,
  });
};

export const updateUserAction = (payload: IGymOwner) => {
  store.dispatch({
    type: "UPDATE_USER",
    payload,
  });
};
export const logoutUserAction = () => {
  store.dispatch({
    type: "LOGOUT_USER",
  });
};
export const setImageUrlAction = (payload: string) => {
  store.dispatch({
    type: "SET_IMAGE_URL",
    payload,
  });
};

export const setMemberShipInfoAction = (payload: string) => {
  store.dispatch({
    type: "SET_MEMBERSHIP_DETAIL",
    payload,
  });
};

export const setGymInfoAction = (payload: string) => {
  store.dispatch({
    type: "SET_GYM_INFO",
    payload,
  });
};

export const setUserTypeAction=(payload: string) => {
  store.dispatch({
    type: "SET_USER_TYPE",
    payload,
  });
}

export const setGymStaffAction=(payload: IStaffDetailResponse | null) => {
  store.dispatch({
    type: "SET_STAFF_INFO",
    payload,
  });
}