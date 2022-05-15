import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date
      .getFullYear()
      .toString()
      .slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = () => {
  const {  messageDetails } = useSelector( (state) => state.chat)

  return (
    <MainContainer>
      <MessagesHeader />
      {messageDetails &&
        messageDetails.length > 0 &&
        messageDetails.map((messages, index) => {
          if (messages.date && messages.date != null) {
            const sameAuthor =
              index > 0 &&
              messageDetails[index].author._id ===
              messageDetails[index - 1].author._id;

            const sameDay =
              index > 0 &&
              convertDateToHumanReadable(
                new Date(messages.date),
                "dd/mm/yy"
              ) ===
                convertDateToHumanReadable(
                  new Date(messageDetails[index - 1].date),
                  "dd/mm/yy"
                );

            return (
              <div key={messages._id} style={{ width: "97%" }}>
                {(!sameDay || index === 0) && (
                  <DateSeparator
                    date={convertDateToHumanReadable(
                      new Date(messages.date),
                      "dd/mm/yy"
                    )}
                  />
                )}

                <Message
                  key={messages._id}
                  content={messages.content}
                  username={messages.author.username}
                  sameAuthor={sameAuthor}
                  date={convertDateToHumanReadable(
                    new Date(messages.date),
                    "dd/mm/yy"
                  )}
                  sameDay={sameDay}
                />
              </div>
            );
          }
        })}
    </MainContainer>
  );
};

export default Messages;
