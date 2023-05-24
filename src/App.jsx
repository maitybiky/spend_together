import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [user, setUser] = useState([
    {
      name: "",
      money: 0,
    },
  ]);
  const [total, setTotal] = useState(0);
  const [final, setFinal] = useState([]);
  const adduser = () => {
    let data = {
      name: "",
      money: 0,
    };
    setUser((prev) => [...prev, data]);
  };
  const calculate = () => {
    let divide = user.map((it) => ({ ...it, cntrb: it.money / user.length }));
    console.log("divide", divide);
    let dashboard = [];
    divide.forEach((left, lind) => {
      divide.forEach((right, rind) => {
        if (lind !== rind) {
          let key = [];
          key[0] = left.name;
          key[1] = right.name;
          dashboard.push({
            rel: key,
            amount: left.cntrb - right.cntrb,
          });
        }
      });
    });
    let reduce = dashboard.filter((it) => it.amount < 0);
    console.log("reduce", reduce);
    setFinal(reduce);
  };
  useEffect(() => {
    let ttl = user.reduce((prev, nxt) => prev + Number(nxt.money), 0);
    setTotal(ttl);
  }, [user]);

  const checkPercent = (num) => {
    let percent = (num / total) * 100;
    console.log('percent', percent)
    if (percent > (40 / (user.length - 1))) {
      return "alert-danger";
    } else if (percent >= (20 / (user.length - 1))) {
      return "alert-warning";
    } else if (percent >= (10/ (user.length - 1))) {
      return "alert-primary";
    } else {
      return "alert-info";
    }
  };
  return (
    <>
      <div className="row my-2">
        <div className="col">Name</div>
        <div className="col">Amount</div>
      </div>
      {user.map((it, ind) => (
        <div className="row my-2">
          <div className="col">
            <input
              onBlur={(e) => {
                setUser((prev) => {
                  let arr = [...prev];
                  arr[ind].name = e.target.value;
                  return arr;
                });
              }}
              type="text"
              className="form-control"
              aria-label="First name"
            />
          </div>
          <div className="col">
            <input
              onChange={(e) => {
                setUser((prev) => {
                  let arr = [...prev];
                  arr[ind].money = e.target.value;
                  return arr;
                });
              }}
              type="number"
              className="form-control"
              aria-label="Last name"
            />
          </div>
        </div>
      ))}
      <button className="btn btn-light m-2" onClick={adduser}>
        add user
      </button>
      <button className="btn btn-info m-2" onClick={calculate}>
        Calculate
      </button>
      <h3 className="m-2">Total : {total}</h3>

      {final.map((it) => (
        <div className={`alert ${checkPercent(-1 * it.amount)}`} role="alert">
          <span className="text-danger mx-2">{it.rel[0]}</span>will pay
          <span className="text-success mx-2">{it.rel[1]}</span> $
          {(-1 * it.amount.toFixed(2))}
        </div>
      ))}
    </>
  );
}

export default App;
