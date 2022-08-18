import { notification } from "antd";

export const toast = (
  title: string,
  message: string,
  type: string,
  duration: number
) => {
  notification[type]({
    message: (
      <div style={{ color: type === "error" ? "red" : "green" }}>{title}</div>
    ),
    description: (
      <div style={{ color: type === "error" ? "red" : "green" }}>{message}</div>
    ),
    duration: duration,
    placement: "bottomRight",
  });
};
