import moment from "moment";
import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
const Mian = () => {
  const loc = useLocation();
  const sessionNameRef = useRef();

  const bg_varient = [
    "alert-primary",
    "alert-secondary",
    "alert-danger",
    "alert-warning",
    "alert-info",
    "alert-light",
    "alert-dark",
    "alert-success",
  ];
  const text = ` Expense Buddy: Effortlessly Split Bills and Settle Payments with Ease!`;
  const [typeText, setTypimgText] = useState("");
  useEffect(() => {
    const typeInterVel = setInterval(() => {
      if (typeText.length === text.length) {
        clearInterval(typeInterVel);
      }
      setTypimgText((prev) => prev + text.charAt(prev.length));
    }, 50);

    return () => {
      clearInterval(typeInterVel);
    };
  }, []);

  const [user, setUser] = useState(
    loc.state
      ? loc.state.user
      : [
          {
            name: "",
            money: 0,
          },
        ]
  );
  const [total, setTotal] = useState(0);
  const [final, setFinal] = useState(loc.state ? loc.state.arr : []);
  const adduser = () => {
    let data = {
      name: "",
      money: 0,
    };
    setUser((prev) => [...prev, data]);
  };
  const calculate = () => {
    let valid = user.every((it) => it.name);
    if (!valid) {
      return;
    }
    let divide = user.map((it) => ({ ...it, cntrb: it.money / user.length }));
    let dashboard = [];
    divide.forEach((left, lind) => {
      divide.forEach((right, rind) => {
        if (lind !== rind && left.cntrb < right.cntrb) {
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
    let reduce = dashboard.reduce(
      (prev, curr, ind, arr) => {
        if (prev[ind].rel[0] === curr.rel[0]) {
          return [
            ...prev,
            {
              ...curr,
              index: prev[ind].index,
              varirent: prev[ind].varirent,
              name: curr.rel[0],
            },
          ];
        }
        return [
          ...prev,
          {
            ...curr,
            index: prev[ind].index + 1,
            varirent: bg_varient[prev[ind].index + 1],
            name: curr.rel[0],
          },
        ];
      },
      [
        {
          name: dashboard[0].rel[0],
          ...dashboard[0],
          index: 0,
          varirent: bg_varient[0],
        },
      ]
    );
    reduce.shift();
    setFinal(reduce);
    handleHistory(reduce);
  };
  const [btnDisable, setBtnDisable] = useState(true);
  useEffect(() => {
    let ttl = user.reduce((prev, nxt) => prev + Number(nxt.money), 0);
    setTotal(ttl);
    let canCalculate = user.every((it) => it.name);
    if (canCalculate && user.length > 1) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [user]);
  const handleHistory = (arr) => {
    let his = reactLocalStorage.get("history");

    if (his) {
      let parsed = JSON.parse(his);
      console.log("his", parsed);
      let newRecord = [
        ...parsed.history,
        { arr, user, time: moment(), name: sessionNameRef.current.value },
      ];
      console.log("newRecord", newRecord);
      reactLocalStorage.set("history", JSON.stringify({ history: newRecord }));
    } else {
      reactLocalStorage.set(
        "history",
        JSON.stringify({
          history: [
            { arr, user, time: moment(), name: sessionNameRef.current.value },
          ],
        })
      );
    }
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <Link to="/history" className="btn lnk">
          History
        </Link>
      </div>
      <div className="row">
        <h6>
          {typeText}
          <span style={{ color: "#553c9a" }} className="blinking">
            _
          </span>
        </h6>
      </div>
      <div className="fadeInItem row my-2">
        <div className="col">
          <input
            ref={sessionNameRef}
            defaultValue={loc.state?.name??moment().format("dddd")}
            onChange={(e) => {
              sessionNameRef.current.value = e.target.value;
            }}
            // defaultValue={it.name}
            placeholder="Enter Name of This session"
            type="text"
            className="form-control"
            aria-label="name-of-session"
          />
        </div>
      </div>
      <div className="row my-2">
        <div className="col">Name</div>
        <div className="col">Amount</div>
      </div>

      {user.map((it, ind) => (
        <div className="fadeInItem row my-2">
          <div className="col">
            <input
              defaultValue={it.name}
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
              defaultValue={it.money}
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
      <button
        disabled={btnDisable}
        className="btn btn-info m-2"
        onClick={calculate}
      >
        Calculate
      </button>
      <h3 className="m-2">Total : 💰 {total}</h3>
      <h6 className="m-2">Each : 💰 {(total / user.length).toFixed(2)}</h6>

      {final.map((it, ind) => (
        <div
          data-prefix={ind * 0.5}
          className={`alert ${it.varirent} fadeInItem`}
          role="alert"
        >
          <span className="text-danger mx-2">{it.rel[0]}</span>will pay
          <span className="text-success mx-2">{it.rel[1]}</span> 💰
          {-1 * it.amount.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default Mian;
