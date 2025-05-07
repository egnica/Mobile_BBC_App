"use client";
import BBC from "../bbcObject.json";
import Link from "next/link";

const Speakers = () => {
  // window.onload = function () {
  // 	window.location.href =
  // 		"./BusinessBankingConference_2024/app-new/speakers.html";
  // };

  //   const sortSpeakers = BBC.event.map((speaker) =>
  //     speaker.sort((a, b) => (a.lName || "").localeCompare(b.lName || ""))
  //   );

  const allSpeakers = BBC.event.flatMap((item) => item.speakers || []);

  return (
    <>
      <div className="back-btn">
        <Link href="/">
          <p>back</p>
        </Link>
      </div>
      <h2>Speakers</h2>
      <div key={allSpeakers.lname}>
        {allSpeakers
          .sort((a, b) => (a.lName || "").localeCompare(b.lName || ""))
          .map((person, pdex) => {
            return (
              person.lName != "" && (
                <Link
                  key={pdex}
                  href={{
                    pathname: "speaker",
                    query: { name: person.lName, pageFrom: "speakers" },
                  }}
                >
                  <div className="speaker-contain" key={`speak ${pdex}`}>
                    <img src={person.photo} />

                    <div className="speaker-info">
                      <h3>
                        {person.fName} {person.lName}
                      </h3>
                      <p style={{ margin: "0" }}>
                        <strong>{person.company}</strong>
                      </p>
                      <p style={{ margin: "0" }}>
                        <em>{person.title}</em>
                      </p>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
      </div>
      );
    </>
  );
};
export default Speakers;
