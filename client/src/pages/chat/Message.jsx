import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <>
    <div className={`flex flex-col ${own ? "justify-end items-end" : "justify-start"}`}>
      <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-xs p-3 sm:text-sm text-white rounded-lg ${
            own ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          <p>{message.text}</p>
        </div>
      </div>
      <div className="mt-1 text-sm text-gray-600 messageBottom">{format(message.createdAt)}</div>
      </div>
    </>
  );
}
