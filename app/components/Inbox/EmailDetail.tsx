"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Avatar from "../commons/Avatar";
import { EmailType } from "@/app/types/custTypes";
import { getEmailDetails } from "@/app/lib/apis";
import { EmailContext } from "@/app/context/EmailContext";
import moment from "moment";
const EmailDetail: React.FC<{ selectedMailId: string }> = ({
  selectedMailId,
}) => {
  const [detail, setDetail] = useState<null | EmailType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { emails, markAsRead, markAsFavorite } = useContext(EmailContext);

  async function fetchEmailDetails(id: string) {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const existingEmailDetail = emails.find((email) => {
          return email.id === selectedMailId;
        })!;
        const {
          data: { body },
        } = await getEmailDetails(selectedMailId);
        if (body && typeof body === "string") {
          //MARK EMAIL AS READ
          markAsRead(selectedMailId, true);
          setDetail({ ...existingEmailDetail, body });
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  async function markAsFavoriteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      markAsFavorite(selectedMailId, true);
      alert("Email is marked as favorite!");
    } catch (error) {
      alert("Failed to mark email as favorite!");
    }
  }

  useEffect(() => {
    fetchEmailDetails(selectedMailId);
    return () => {
      setDetail(null);
    };
  }, [selectedMailId]);

  useEffect(()=>{
    if(detail){
        let updatedEmail = emails.find(email=> email.id === selectedMailId)!
        let body = detail.body
        setDetail({...updatedEmail,body})
    }
  },[emails])

  return (
    <div className="h-full w-full bg-white grid grid-cols-12 p-3">
      {isLoading ? (
        <div>Loading...</div>
      ) : detail ? (
        <>
          <div>
            <Avatar name="Foo Bar" />
          </div>
          <div className="col-span-11">
            <div className="flex flex-row justify-between items-center">
              <p className="flex flex-col">
                <span className="text-2xl font-bold">{detail.subject}</span>
                <span>{moment(detail?.date).format('DD/MM/yyyy hh:mm a')}</span>
              </p>
              {!detail.isFavorite && (
                <p>
                  <button 
                    onClick={markAsFavoriteHandler}
                    className="rounded-xl px-2 py-1 text-white text-sm bg-[var(--primary)]">

                    Mark as Favorite
                  </button>
                </p>
              )}
            </div>
            <div
              className="py-2"
              dangerouslySetInnerHTML={{ __html: detail?.body! }}
            ></div>
          </div>
        </>
      ) : (
        <div>Not Found!</div>
      )}
    </div>
  );
};

export default EmailDetail;
