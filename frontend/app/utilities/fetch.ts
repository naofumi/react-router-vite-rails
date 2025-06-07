import {getCSRFToken} from "~/utilities/csrf"

export const defaultGetHeaders = {
  Accept: "application/json",
};

export const defaultPostHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-CSRF-Token": getCSRFToken(),
};
