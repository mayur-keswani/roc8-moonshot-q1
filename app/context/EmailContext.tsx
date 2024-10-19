"use client";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { EmailFilterType, EmailType } from "../types/custTypes";

type EmailContextType = {
  emails: EmailType[];
  setEmailsList: (emails: EmailType[]) => void;
  selectedFilter: EmailFilterType | null;
  filterEmailsBy: (state: EmailFilterType) => void;
  markAsFavorite: (emailId: string, markAsFavorite: boolean) => void;
  markAsRead: (emailId: string, markAsFavorite: boolean) => void;
};
let defaultValue: EmailContextType = {
  emails: [],
  setEmailsList: (emails: EmailType[]) => {},
  selectedFilter: null,
  filterEmailsBy: (state: EmailFilterType) => {},
  markAsFavorite: (emailId: string, markAsFavorite: boolean) => {},
  markAsRead: (emailId: string, markAsFavorite: boolean) => {},
};
export const EmailContext = createContext<EmailContextType>(defaultValue);

const EmailContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<EmailFilterType | null>(
    null
  );

  function setEmailsList(emails: EmailType[]) {
    setEmails((prevEmail) => prevEmail.concat(emails));
  }

  function markAsFavorite(emailId: string, markAsFavorite: boolean) {
    let updatedEmail = emails.map((email) => {
      if (email.id?.toString() === emailId) {
        return { ...email, isFavorite: markAsFavorite };
      } else return email;
    });
    setEmails(updatedEmail);
  }

  function markAsRead(emailId: string, markAsRead: boolean) {
    let updatedEmail = emails.map((email) => {
      if (email.id?.toString() === emailId) {
        return { ...email, isRead: markAsRead };
      } else return email;
    });
    setEmails(updatedEmail);
  }

  function filterEmailsBy(state: EmailFilterType) {
    setSelectedFilter(state);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      let emails = localStorage.getItem("emails")!;
      if (emails) {
        let parsedEmails = JSON.parse(emails);
        setEmails(parsedEmails);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emails", JSON.stringify(emails));
    }
  }, [emails]);

  return (
    <EmailContext.Provider
      value={{
        emails,
        setEmailsList,
        selectedFilter,
        filterEmailsBy,
        markAsFavorite,
        markAsRead,
      }}
    >
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailContextProvider;
