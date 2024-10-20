"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Email from "./Email";
import { EmailFilterType, EmailType } from "@/app/types/custTypes";
import EmailDetail from "./EmailDetail";
import { EmailContext } from "@/app/context/EmailContext";
import { getEmails } from "@/app/lib/apis";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const Inbox: React.FC = () => {
  const [selectedMail, setSelectedMail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { emails, setEmailsList, selectedFilter, setInitalEmailsList } =
    useContext(EmailContext);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  async function fetchEmails(page: number, isInitial = true) {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const {
          data: { list },
        } = await getEmails(page);
        let updatedEmailList = list.map((em: EmailType) => ({
          ...em,
          isRead: false,
          isFavorite: false,
        }));
       
        if (isInitial) setInitalEmailsList(updatedEmailList);
        else setEmailsList(updatedEmailList);

        setIsLoading(false);
      }, 1000);
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  useEffect(() => {
    if (currentPage * DEFAULT_PAGE_SIZE > emails.length)
      fetchEmails(currentPage, emails?.length > 0 ? false : true);
  }, [currentPage]);

  let filterEmails = useMemo(() => {
    console.log({ selectedFilter });
    let filteredEmails = emails.filter((email) => {
      if (selectedFilter && selectedFilter !== EmailFilterType.ALL) {
        if (selectedFilter === EmailFilterType.READ) {
          return email.isRead;
        }
        if (selectedFilter === EmailFilterType.FAVORITE) {
          return email.isFavorite;
        }
        if (selectedFilter === EmailFilterType.UNREAD) {
          return !email.isRead;
        }
      } else {
        return true;
      }
    });
    console.log({ filteredEmails });
    return filteredEmails.slice(
      currentPage * DEFAULT_PAGE_SIZE - DEFAULT_PAGE_SIZE,
      currentPage * DEFAULT_PAGE_SIZE
    );
  }, [emails, selectedFilter, currentPage]);

  return (
    <div className={`h-[calc(100%-100px)] `}>
      {isLoading ? (
        <div className="flex items-center justify-center text-[var(--primary)] font-semibold text-xl">
          Loading ....
        </div>
      ) : (
        <>
          <div
            className={`grid ${selectedMail ? "grid-cols-3" : "grid-cols-1"}`}
          >
            <ul className="flex w-full flex-col items-start justify-start gap-2 overflow-y-scroll">
              {filterEmails.map((email, index) => (
                <Email
                  key={email.id + "" + index}
                  data={email}
                  onSelect={() => {
                    setSelectedMail(email.id);
                  }}
                />
              ))}
            </ul>
            {selectedMail && (
              <div className="col-span-2">
                <EmailDetail selectedMailId={selectedMail} />
              </div>
            )}
          </div>

          {/* PAGINATION */}
          <nav
            className="flex items-center justify-center -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              onClick={() => {
                setCurrentPage((prevPage) => prevPage - 1);
              }}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {currentPage}
            </button>

            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={async () => {
                setCurrentPage((prevPage) => prevPage + 1);
              }}
              disabled={currentPage === 2}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default Inbox;
