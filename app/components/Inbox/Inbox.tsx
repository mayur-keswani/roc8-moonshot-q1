"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Email from "./Email";
import { EmailFilterType, EmailType } from "@/app/types/custTypes";
import EmailDetail from "./EmailDetail";
import { EmailContext } from "@/app/context/EmailContext";
import { getEmails } from "@/app/lib/apis";

const Inbox: React.FC = () => {
  const [selectedMail, setSelectedMail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { emails, setInitialEmails, selectedFilter } = useContext(EmailContext);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        setTimeout(async () => {
          const {
            data: { list },
          } = await getEmails(currentPage);
          let updatedEmailList = list.map((em: EmailType) => ({
            ...em,
            isRead: false,
            isFavorite: false,
          }));
          setInitialEmails(updatedEmailList);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        alert("Something went wrong!");
      }
    })();
  }, []);
  let filterEmails = useMemo(() => {
    return emails.filter((email) => {
      if (selectedFilter) {
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
  }, [emails, selectedFilter]);

  return (
    <div className={`h-[calc(100%-100px)] `}>
      {isLoading ? (
        <div className="flex items-center justify-center text-[var(--primary)] font-semibold text-xl">
          Loading ....
        </div>
      ) : (
        <div className={`grid ${selectedMail ? "grid-cols-3" : "grid-cols-1"}`}>
          <ul className="flex w-full flex-col items-start justify-start gap-2 overflow-y-scroll">
            {filterEmails.map((email) => (
              <Email
                key={email.id}
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
      )}
    </div>
  );
};

export default Inbox;
