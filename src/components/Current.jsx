import React, { useEffect, useState } from 'react'
import axios from "axios"
import iconArrowUp from "../assets/desktop/icon-arrow-up.svg"
import iconSun from "../assets/desktop/icon-sun.svg"
import iconMoon from "../assets/desktop/icon-moon.svg"
import "../css/main.css"

const Current = () => {
    const [greet, setGreet] = useState(null)
    const [period, setPeriod] = useState(null)
    const [reg, setReg] = useState({})
    const [location, setLocation] = useState({});
    const [hour, setHour] = useState(null)
    const [min, setMin] = useState(null)
    const [expand, setExpand] = useState(false)
    const [theme, setTheme] = useState(false)


   function getTime() {
    let currentTime = new Date();
         setHour(currentTime.getHours());
         setMin(currentTime.getMinutes());


    //Time of day
    if (hour >= 5 && hour <= 11) {
      setGreet("morning");
    } else if (hour >= 12 && hour <= 17) {
      setGreet("afternoon");
    } else {
      setGreet("evening");
    }


     //Bg and icon
    //  if (hour >= 5 && hour <= 17) {
    //   //  background.classList.add("day");
    //   //  icon.src = "./assets/desktop/icon-sun.svg";
    //   //  icon.setAttribute("alt", "sun icon");
    //  } else {
    //   //  background.classList.add("night");
    //   //  icon.src = "./assets/desktop/icon-moon.svg";
    //   //  icon.setAttribute("alt", "moon icon");
    //   //  details.style.color = "#fff";
    //   //  details.style.background = "rgba(0, 0, 0, 0.75)";
    //  }

     // Time setup
     if (min < 10) {
      setMin((prevMin) => prevMin + min);
      //  min = "0" + min;
     }

     if (hour === 0) {
      setHour((prevHr) => prevHr + 12)
      //  hour = 12;
    setPeriod("am")
     } else if (hour === 12) {
       setPeriod("pm")
     } else if (hour > 12) {
      setHour((prevHr) => prevHr - 12);
      //  hour -= 12;
       setPeriod("pm")
     } else {
       setPeriod("am");
     }


     //Update time
     let interval = (60 - new Date().getSeconds()) * 1000 + 5;
     setTimeout(getTime, interval);
   }
   function getLocation() {
     axios
       .get("https://api.ipbase.com/v1/json/")
       .then(async(locationRes) => {
        const data = await locationRes.data;
        setLocation(data);
       })
       .catch((err) => console.error(err));
   }
   function getTimeZone() {
     axios
       .get("https://worldtimeapi.org/api/ip")
       .then(async(regionRes) => {
         const region = await regionRes.data;
         console.log(region)
         //Local timezone
         setReg(region);
         //Details
       })
       .catch((err) => console.error(err));
   }


   useEffect(()=>{
    getTime()
    getLocation()
    getTimeZone()
   }, [])
// console.log(reg)
  return (
    <>
      <h1 className="sr-only">Clock app</h1>
      <div
        className={
          hour >= 5 && hour <= 17 ? "background day" : "background night"
        }
      ></div>
      <article className="currently">
        <div className="widgets-wrapper">
          <header>
            <img onClick={()=> setTheme(!theme)}
              className="icon"
              src={hour >= 5 && hour <= 17 ? iconSun : iconMoon}
              alt={hour >= 5 && hour <= 17 ? "sun icon" : "moon icon"}
            />
            <h2 className="currently__greeting">good {greet}</h2>
            <span>, it's currently</span>
          </header>
          <section className="currently__time">
            <div className="time-wrapper">
              <h2 className="time-now">
                {hour}:{min}
              </h2>
              <div className="standard-time">
                <p className="period">{period}</p>
                <p className="region">{reg.abbreviation} </p>
              </div>
            </div>
            <h3 className="currently__location">
              in {location.region_name}, {location.country_code}
            </h3>
          </section>
        </div>
        <button className="expand" onClick={() => setExpand(!expand)}>
          More
          <img
            src={iconArrowUp}
            alt="arrow icon"
            aria-hidden="true"
            className="arrow"
          />
        </button>
      </article>
      {/* Details */}
      {expand && (
        <article
          className="details"
          style={
            hour >= 5 && hour <= 17
              ? null
              : { color: "#fff", background: "rgba(0, 0, 0, 0.75)" }
          }
        >
          <ul className="details__contents">
            <li className="details__region info">
              <h4>Current timezone</h4>
              <p id="timezone">{reg.timezone}</p>
            </li>
            <li className="details__day info">
              <h4>Day of the year</h4>
              <p id="year-day">{reg.day_of_year}</p>
            </li>
            <li className="details__week-day info">
              <h4>Day of the week</h4>
              <p id="week-day">{reg.day_of_week}</p>
            </li>
            <li className="details__week-number info">
              <h4>Week number</h4>
              <p id="week-number">{reg.week_number}</p>
            </li>
          </ul>
        </article>
      )}
    </>
  );
}

export default Current;