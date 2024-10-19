"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Avatar from "../commons/Avatar";
import { EmailType } from "@/app/types/custTypes";
import { getEmailDetails, updateEmailDetails } from "@/app/lib/apis";
import { EmailContext } from "@/app/context/EmailContext";
const EmailDetail: React.FC<{ selectedMailId: string }> = ({
  selectedMailId,
}) => {
  const [detail, setDetail] = useState<null | EmailType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { emails,markAsRead } = useContext(EmailContext);

  async function fetchEmailDetails(id: string) {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const {
          data,
        } = await getEmailDetails(selectedMailId);
        if (data) {
          //MARK EMAIL AS READ
          await updateEmailDetails(id, { isRead: true });
          markAsRead(selectedMailId, true);
          setDetail(data.body);
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  useEffect(() => {
    fetchEmailDetails(selectedMailId);
    return () => {
      setDetail(null);
    };
  }, [selectedMailId]);

  // useEffect(()=>{
  //   if(detail){
  //       let updatedEmail = emails.find(email=> email.id === selectedMailId)
        
  //       if(updatedEmail) setDetail(updatedEmail)
  //   }
  // },[emails])

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
                <span>{detail.date}</span>
              </p>
              {!detail.isFavorite && (
                <p>
                  <button className="rounded-xl px-2 py-1 text-white text-sm bg-[var(--primary)]">
                    Mark as Favorite
                  </button>
                </p>
              )}
            </div>
            <div className="py-2">{detail?.body}</div>
          </div>
        </>
      ) : (
        <div>Not Found!</div>
      )}
    </div>
  );
};

export default EmailDetail;
