import { EmailType } from "@/app/types/custTypes";
import React, { ReactEventHandler, useContext } from "react";
import Avatar from "../commons/Avatar";
import { EmailContext } from "@/app/context/EmailContext";
import moment from "moment";

const Email: React.FC<{ data: EmailType , onSelect: Function }> = ({
  data,
  onSelect
}) => {
  const { markAsFavorite } = useContext(EmailContext);
  async function markAsFavoriteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      markAsFavorite(data.id, true);
      alert("Email is marked as favorite!");
    } catch (error) {
      alert("Failed to mark email as favorite!");
    }
  }
  return (
    <li
      key={data.id}
      className={`w-full cursor-pointer p-4 ${
        data.isRead ? "bg-[#f2f2f2]" : "bg-white"
      } hover:bg-[var(--secondary)] border-[var(--border)] border-2 md:p-2 `}
      onClick={() => onSelect()}
    >
      <div className="flex w-full items-start justify-start gap-1 md:gap-4">
        <Avatar name={data.from.name} />
        <div className="flex w-full flex-col items-start justify-start gap-1 truncate text-ellipsis">
          <div className="flex w-full flex-col items-start justify-start">
            <p>
              <span>From: </span>
              <span className="font-bold">{`${data.from.name} <${data.from.email}>`}</span>
            </p>
            <p>
              <span>Subject: </span>
              <span className="font-bold">{data.subject}</span>
            </p>
            <p>{data.short_description}</p>
            <p className="flex justify-between items-center w-1/4">
              <span>{moment(data?.date).format('DD/MM/yyyy hh:mm a')}</span>
              {!data?.isFavorite && (
                <span>
                  <button
                    className="font-bold text-[var(--primary)] cursor-pointer"
                    onClick={markAsFavoriteHandler}
                  >
                    Favorite
                  </button>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Email;
