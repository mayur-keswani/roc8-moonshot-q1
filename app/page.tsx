'use client';
import Filters from "./components/Inbox/Filters";
import Inbox from "./components/Inbox/Inbox";

export default function Home() {
 
  return (
    <div>
      <main className="h-lvh w-full py-10 px-5">
        <Filters/>
        <Inbox />
      </main>
    </div>
  );
}
