/* eslint-disable @next/next/no-img-element */
"use client";
import BBC from "../bbcObject.json";
import arrow from "../../images/down-arrow.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Agenda = () => {
  // window.onload = function () {
  // 	window.location.href =
  // 		"./BusinessBankingConference_2024/app-new/agenda.html";
  // };

  const [reveal, setReveal] = useState(0);
  const [day, setDay] = useState("tues");
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    if (day === "") {
      setFilteredEvents(BBC.event);
    } else {
      setFilteredEvents(BBC.event.filter((item) => item.day === day));
    }
  }, [day]);

  const eventClick = (id) => {
    reveal != id ? setReveal(id) : setReveal(0);
  };

  const caretReveal = (decrip) => {
    return decrip ? (
      <Image className="caret" alt="caret" width={"25"} src={arrow} />
    ) : (
      <span style={{ width: "40px" }} />
    );
  };

  return (
    <>
      <div className="back-btn">
        <Link href="/">
          <p>back</p>
        </Link>
      </div>
      <h1>Agenda</h1>
      <div className="daySelectCont">
        <div className="daySelectBtn" onClick={() => setDay("tues")}>
          Tuesday <br /> 5/13
        </div>
        <div className="daySelectBtn" onClick={() => setDay("wed")}>
          Wednesday <br /> 5/14
        </div>
        <div className="daySelectBtn" onClick={() => setDay("")}>
          All Dates <br /> 5/13-5/14
        </div>
      </div>

      {day == "tues" ? (
        <h2>Tuesday - May 13th</h2>
      ) : day == "wed" ? (
        <h2>Wednesday - May 14th</h2>
      ) : (
        <h2>
          Tuesday & Wednesday <br />
          May 13th - 14th
        </h2>
      )}

      <div>
        {filteredEvents.map((item, index) => {
          return (
            <div key={index}>
              <div className="agenda-item">
                {caretReveal(item.description)}
                <p onClick={() => eventClick(item.id)} key={item.id}>
                  <strong>{item.time}</strong> {item.title}
                </p>
              </div>
              {reveal == item.id && (
                <div className="reveal-contain">
                  {item.description && (
                    <>
                      <p>
                        {item.title}
                        <br />
                        <span>
                          <em>{item.secondTitle}</em>
                        </span>
                      </p>
                      <p
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </>
                  )}
                  <div className="speaker-pic-contain">
                    {item.speakers.map((person, index) => {
                      return (
                        person.fName && (
                          <>
                            <Link
                              key={index}
                              href={{
                                pathname: "speaker",
                                query: {
                                  name: person.lName,
                                  pageFrom: "agenda",
                                },
                              }}
                            >
                              <div className="speaker-pic-info" key={index}>
                                <img alt={person.lName} src={person.photo} />
                                <p>
                                  {person.fName} {person.lName}
                                  <br />
                                  <span
                                    style={{
                                      fontSize: ".9em",
                                    }}
                                  >
                                    {person.company}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </>
                        )
                      );
                    })}
                  </div>
                  {item.assets != "" && (
                    <a href={item.assets}>
                      <div className="assets-button">View Slides</div>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Agenda;
