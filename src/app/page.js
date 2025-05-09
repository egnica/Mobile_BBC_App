"use client";
import Link from "next/link";
import Image from "next/image";
import BBC from "./bbcObject.json";
import logo from "../images/Barlow_Black.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (setCopied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [copied]);

  const passwordClipboard = () => {
    const password = "W@ldenGu3st";
    navigator.clipboard.writeText(password);
    setCopied(true);
  };
  return (
    <>
      <div
        className="header"
        style={{ textAlign: "center", lineHeight: "1.2" }}
      >
        <a href="https://barlowresearch.com/index.php">
          <Image
            alt="logo"
            src={logo}
            style={{ maxWidth: "30%", height: "auto" }}
          />
        </a>
        <h4 style={{ margin: "0" }}>Barlow Research&apos;s</h4>
        <h2 style={{ margin: "0" }}> 2025 Business Banking Conference</h2>
      </div>

      <Link href="./agenda">
        <div className="layout-btn">Agenda</div>
      </Link>
      <Link href="./speakers">
        <div className="layout-btn">Speakers</div>
      </Link>
      <Link href="./attendees">
        <div className="layout-btn">Attendees</div>
      </Link>
      <br />
      <h3 style={{ textAlign: "center" }}>WIFI</h3>
      <h4 style={{ textAlign: "center" }}>
        Network Name: Guest
        <br /> User Name: Walden Guest <br /> Password: W@ldenGu3st
      </h4>
      <div style={{ display: "grid" }}>
        <div
          style={{ margin: "auto" }}
          className="layout-btn"
          onClick={passwordClipboard}
        >
          Copy Password
        </div>
        <div style={{ height: "30px" }}>
          {copied && (
            <p
              style={{
                color: "#112945",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Copied!
            </p>
          )}
        </div>
      </div>

      <br />
      <h3 style={{ textAlign: "center" }}>Sponsors</h3>
      <div className="spons-contain">
        {BBC.sponsors.map((item, index) => {
          return (
            <div className="spons-ch" key={index}>
              <a href={item.url}>
                <img src={item.image} />
              </a>
            </div>
          );
        })}
      </div>
      <h3 style={{ textAlign: "center" }}>Questions?</h3>
      <div style={{ margin: " 10px 20px 40px 20px" }}>
        <a href="mailto:cgarcia@barlowresearch.com">
          <div className="layout-btn">
            <p>Send email</p>
          </div>
        </a>
      </div>
    </>
  );
}
