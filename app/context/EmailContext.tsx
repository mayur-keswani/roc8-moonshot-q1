"use client";
import React, { createContext, PropsWithChildren, useState } from "react";
import { EmailFilterType, EmailType } from "../types/custTypes";

type EmailContextType = {
  emails: EmailType[];
  setInitialEmails:(emails:EmailType[])=>void;
  selectedFilter: EmailFilterType | null;
  filterEmailsBy: (state: EmailFilterType) => void;
  markAsFavorite: (emailId: string, markAsFavorite: boolean) => void;
  markAsRead: (emailId: string, markAsFavorite: boolean) => void;
};
let defaultValue: EmailContextType = {
  emails: [],
  setInitialEmails:(emails:EmailType[])=>{},
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

  function setInitialEmails(emails:EmailType[]){
    setEmails(emails)
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
  return (
    <EmailContext.Provider
      value={{
        emails,
        setInitialEmails,
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
