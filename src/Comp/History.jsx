import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import del from "../../public/times-circle.svg";
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
      if (typeingText.length === text.length) {
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

  const navi = useNavigate();
  const hamdledel = (ind) => {
    console.log("first");
    setRecord((prev) => {
      let n = [...prev];
      n.splice(ind, 1);
      let his = reactLocalStorage.get("history");
      if (his) {
        let parsed = JSON.parse(his);
        console.log("his", parsed);
        let newRecord = [...n];
        reactLocalStorage.set(
          "history",
          JSON.stringify({ history: newRecord })
        );
      }
      return n;
    });
  };
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
        {record?.map((item, ind) => {
          let user = item?.user?.map((it) => {
            return it.name;
          });
          return (
            <>
              <li
                key={ind}
                onClick={() => navi("/", { state: item })}
                className="list-group-item text-center m-2 d-flex justify-content-center align-items-center"
              >
                {moment(item.time).format("lll")}
                <br />
                {user.join(",")}

                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    hamdledel(ind);
                  }}
                  style={{ marginLeft: "25px", color: "red",height:30,width:30 }}
                  className="fa fa-times "
                  aria-hidden="true"
                />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
