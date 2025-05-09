"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import data from "../attendees.json";

const Page = () => {
  const attendees = Object.values(data.Sheet1);
  const [sortKey, setSortKey] = useState("ContactFL");
  const [flip, setFlip] = useState(true);

  const sortableList = () => {
    const list = attendees.map(({ ContactFL, Company, Title }) => ({
      ContactFL,
      Company,
      Title,
    }));

    return [...list].sort((a, b) => {
      let valA, valB;

      if (sortKey === "ContactFL") {
        valA = (a.ContactFL || "").split(" ")[1].toLowerCase();
        valB = (b.ContactFL || "").split(" ")[1].toLowerCase();
      } else {
        valA = (a[sortKey] || "").toLowerCase();
        valB = (b[sortKey] || "").toLowerCase();
      }

      const aMissing = valA === "";
      const bMissing = valB === "";

      if (aMissing && !bMissing) return 1;
      if (!aMissing && bMissing) return -1;

      return flip ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  };
  return (
    <div>
      <div className="back-btn">
        <Link href="/">
          <p>back</p>
        </Link>
      </div>
      <h1>List of Attendees</h1>
      <h2>Sort By:</h2>
      <div className="sortButtonCont">
        <div>
          <div
            className="assets-button"
            onClick={() => setSortKey("ContactFL")}
          >
            Name
          </div>

          <div className="assets-button" onClick={() => setSortKey("Company")}>
            Company
          </div>
        </div>
        <div className="arrowContain">
          <div className="arrowBtn" onClick={() => setFlip(true)}>
            ⬆️
          </div>
          <div className="arrowBtn" onClick={() => setFlip(false)}>
            ⬇️
          </div>
        </div>
      </div>
      <hr />
      {sortableList().map((item, index) => (
        <div key={index}>
          <div className="personContainer">
            {sortKey == "ContactFL" ? (
              <p>
                Name: {item.ContactFL} <br />
                Company: {item?.Company || <em>N/A</em>} <br />
                Title: {item?.Title || <em>N/A</em>}
              </p>
            ) : (
              <p>
                Company: {item?.Company || <em>N/A</em>} <br />
                Name: {item.ContactFL} <br />
                Title: {item?.Title || <em>N/A</em>}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
