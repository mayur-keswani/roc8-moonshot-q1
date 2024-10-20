import { EmailContext } from "@/app/context/EmailContext";
import { EmailFilterType } from "@/app/types/custTypes";
import React, { useContext } from "react";

const Filters: React.FC = () => {
  const { filterEmailsBy, selectedFilter } = useContext(EmailContext);

  return (
    <div className="h-[100px] flex justify-start items-center">
      <div className="font-bold">Filter By: &nbsp;</div>
      <div className="space-x-2">
        <button
          className={`px-3 py-1 rounded-xl ${
            selectedFilter === EmailFilterType.UNREAD && "selected-filter-btn"
          } hover:bg-[var(--secondary)] hover:border-[var(--secondary)] hover:border-2`}
          onClick={() => {
            filterEmailsBy(EmailFilterType.UNREAD);
          }}
        >
          Unread
        </button>
        <button
          className={`px-3 py-1 rounded-xl  ${
            selectedFilter === EmailFilterType.READ && "selected-filter-btn"
          } hover:bg-[var(--secondary)] hover:border-[var(--secondary)] hover:border-2`}
          onClick={() => {
            filterEmailsBy(EmailFilterType.READ);
          }}
        >
          Read
        </button>
        <button
          className={`px-3 py-1 rounded-xl  ${
            selectedFilter === EmailFilterType.FAVORITE && "selected-filter-btn"
          } hover:bg-[var(--secondary)] hover:border-[var(--secondary)] hover:border-2`}
          onClick={() => {
            filterEmailsBy(EmailFilterType.FAVORITE);
          }}
        >
          Favorite
        </button>

        <button
          className={`float-right px-3 py-1 rounded-xl bg-red-600"
          } hover:border-2`}
          onClick={() => {
            filterEmailsBy(EmailFilterType.ALL);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
