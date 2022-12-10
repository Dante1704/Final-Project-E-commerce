import React from "react";
// import CardLineChart from "../../Features/Cards/CardLineChart";
import CardStats from "../../Features/Cards/CardStats";

// components

import MapExample from "../../Features/Maps/MapExample";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardStats />
          </div>
        </div>
      </div>
    </>
  );
}
