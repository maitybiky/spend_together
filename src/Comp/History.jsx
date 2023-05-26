import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
const History = ({ page }) => {
  const [record, setRecord] = useState(() => {
    let history = reactLocalStorage.get("history");
    if (history) {
      let pr = JSON.parse(history);

      return pr.history.reverse();
    }
    return [];
  });
  const text = `    Note : clearing browser history or using in incognito tab does store
  history for next visit`;
  const [typeingText, setTypimgText] = useState("");
  useEffect(() => {
    const typeInterVel = setInterval(() => {
      if ((typeingText.length === text.length)) {
        clearInterval(typeInterVel);
      }
      setTypimgText((prev) => prev + text.charAt(prev.length));
    }, 50);

    return () => {
      clearInterval(typeInterVel);
    };
  }, []);

  useEffect(() => {
    setRecord(() => {
      let history = reactLocalStorage.get("history");
      if (history) {
        let pr = JSON.parse(history);
        console.log("pr", pr);
        return pr.history.reverse();
      }
      return [];
    });
  }, [page]);
  console.log("record", record);
  const navi = useNavigate();

  return (
    <div className="container">
      <div className="row  ">
        <h6>History</h6>
        <Link to="/">+ New Tab</Link>
        <p style={{ textAlign: "left" }} className="">
          {typeingText}
          <span className="blinking">|</span>
        </p>
      </div>
      <ul className="list-group">
        {record?.map((item) => {
          let user = item?.user?.map((it) => {
            return it.name;
          });
          return (
            <li
              onClick={() => navi("/", { state: item })}
              className="list-group-item text-center m-2 d-flex justify-content-center align-items-center"
            >
              {moment(item.time).format("lll")}
              <br />
              {user.join(",")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
