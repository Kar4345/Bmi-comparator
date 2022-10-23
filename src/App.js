import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import "./styles/App.css";
import Card from "./components/Card";
const getLocalData = () => {
  const list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

export default function App() {
  const [userName, setUserName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [data, setData] = useState(getLocalData());
  const [showGraph, setShowGraph] = useState(data.length !== 0);
  const [isDisabled, setIsDisabled] = useState(true);
  const calculateBmi = () => {
    if (height && weight && userName) {
      if (data.some((el) => el.name === userName)) {
        setUserName("");
        alert("Name already exist!!!");
        return;
      }
      if (weight < 20) {
        alert("Please enter valid weight!");
        return;
      }
      if (height < 100) {
        alert("Please enter valid height!");
        return;
      }
      const heightInMeters = height / 100;
      if (heightInMeters === 0) {
        alert(`BMI can't be infinite`);
        return;
      }
      
      const ans = weight / (heightInMeters * heightInMeters);
      const bmi = ans.toFixed(1);
      let date = new Date();
      let now =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      setData([...data, { Bmi: bmi, name: userName, Date: now }]);
      setWeight(0);
      setHeight(0);
      setUserName("");
    } else {
      alert("Fill all entries!!");
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(data));
    setShowGraph(data.length !== 0);
  }, [data]);

  const onChangeHeight = (e) => {
    if (!isNaN(Number(e.target.value))) {
      if (weight && userName) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
      setHeight(e.target.value);
    }
  };

  const onChangeWeight = (e) => {
    if (!isNaN(Number(e.target.value))) {
      if (height && userName) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
      setWeight(e.target.value);
    }
  };

  const deleteItem = (index) => {
    let arr = [...data];
    arr.splice(index, 1);
    setData(arr);
  };

  function onNameChangeHandler(e) {
    if (weight && height) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setUserName(e.target.value);
  }

  return (
    <div id="container">
      <header>
        <h1>BMI Comparator</h1>
      </header>
      <section className="inputs">
        <div className="values">
          <label htmlFor="name">Enter name</label>
          <br />
          <input
            id="name"
            placeholder="Name here..."
            onChange={onNameChangeHandler}
            value={userName}
          ></input>
        </div>
        <div className="values">
          <label htmlFor="weight">Weight (in kg)</label>
          <br />
          <input
            type={"number"}
            id="weight"
            min={20}
            onChange={onChangeWeight}
            value={weight}
          ></input>
        </div>
        <div className="values">
          <label htmlFor="height">Height (in cms)</label>
          <br />
          <input
            type={"number"}
            id="height"
            min={100}
            onChange={onChangeHeight}
            value={height}
          ></input>
        </div>
      </section>
      <section id="calculate">
        <button id="calc" disabled={isDisabled} onClick={calculateBmi}>
          Calculate
        </button>
      </section>
      {showGraph ? (
        <>
          <div id="chart">
            <Chart data={data} />
          </div>

          <section id="hist">
            <div id="history">
              {data.map((val, index) => {
                return (
                  <Card info={val} deleteItem={deleteItem} index={index} />
                );
              })}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
