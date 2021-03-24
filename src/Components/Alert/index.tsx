import * as React from "react";
import "./Styles.css";

interface Props {
  title: string;
  message: string;
  type?: "error" | "success";
  className?: string;
}

const Alert = ({ title, message, type = "success", className }: Props) => {
  return (
    <div className={[`${type}-alert`, className].join(" ")}>
      <span className="title-alert">{title}</span>
      <span className="message-alert">{message}</span>
    </div>
  );
};

export default Alert;
