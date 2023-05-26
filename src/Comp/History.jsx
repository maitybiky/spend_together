import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { reactLocalStorage } from "reactjs-localstorage";
const History = ({ page }) => {
  const [record, setRecord] = useState(() => {
    let history = reactLocalStorage.get("history");
    if (history) {
      return JSON.parse(history);
    }
    return [];
  });
  useEffect(() => {
    setRecord(() => {
      let history = reactLocalStorage.get("history");
      if (history) {
        return JSON.parse(history);
      }
      return [];
    });
  }, [page]);
  console.log("record", record);
  const navi = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <h6>History</h6>
        <p>
          Note : clearing browser history or using in incognito tab does store
          history for next visit
        </p>
      </div>
      <ul className="list-group">
        {record.history?.reverse().map((item) => {
          let user = item?.user?.map((it) => {
            return it.name;
          });
          return (
            <li
              onClick={() => navi("/", { state: item })}
              className="list-group-item m-2 d-flex justify-content-between align-items-center"
            >
              {moment(item.time).format("lll")}
             <br/>
              {user.join(",")}
            
              
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
