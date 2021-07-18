/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios, { AxiosResponse } from "axios";
import "./App.css";

interface history {
  from: string;
  to: string;
  amount: string;
  result: string;
}

function SimpleDialog(props: { onClose: any; open: boolean }) {
  const storage: string | null = localStorage.getItem("convertHistory");
  const historyArray: history[] = storage ? JSON.parse(storage) : [];
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <h3>Conversion History</h3>
      <table id="history">
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
          <th>Result</th>
        </tr>
        {historyArray.map((i: history) => (
          <tr>
            <td>{i.from}</td>
            <td>{i.to}</td>
            <td>{i.amount}</td>
            <td>{i.result}</td>
          </tr>
        ))}
      </table>
    </Dialog>
  );
}

function App(): JSX.Element {
  const storage: string | null = localStorage.getItem("convertHistory");
  const historyArray: history[] = storage ? JSON.parse(storage) : [];
  const [from, setFrom]: [string, (data: string) => void] = useState("");
  const [to, setTo]: [string, (data: string) => void] = useState("");
  const [amount, setAmount]: [string, (data: string) => void] = useState("");
  const [converted, setConverted]: [string, (data: string) => void] =
    useState("");
  const [currencies, setCurrencies]: [string[], (data: string[]) => void] =
    useState([] as string[]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get<string[]>("http://localhost:3333/currencie")
      .then((response: AxiosResponse) => setCurrencies(response.data))
      .catch((err) => {
        console.error(`ops! ocorreu um erro${err}`);
      });
  }, []);

  const saveHistory = (
    objFrom: string,
    objTo: string,
    objAmount: string,
    result: string
  ) => {
    const object: history = {
      from: objFrom,
      to: objTo,
      amount: objAmount,
      result,
    };
    if (historyArray.length < 10) {
      historyArray.push(object);
      localStorage.setItem("convertHistory", JSON.stringify(historyArray));
    } else if (historyArray.length === 10) {
      let previous: history = object;
      let actual: history = object;
      historyArray.forEach((item: history, i: number) => {
        if (i === 0) {
          previous = item;
          historyArray[i] = object;
        } else {
          actual = item;
          historyArray[i] = previous;
          previous = actual;
        }
      });
      console.log(historyArray);
      localStorage.setItem("convertHistory", JSON.stringify(historyArray));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    axios
      .get<string>(
        `http://localhost:3333/converter/${Number(amount)}/${from}/${to}`
      )
      .then((response: AxiosResponse) => {
        setConverted(response.data);
        saveHistory(from, to, amount, response.data);
      })
      .catch((err) => {
        console.error(`ops! ocorreu um erro${err}`);
      });
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Easy Exchange</h1>
      <h3>Your currencie converter</h3>

      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <span>From: </span>
            <select
              name="from"
              value={from}
              onChange={(e) => setFrom(e?.target?.value)}
            >
              {currencies.map((i: string) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label>
            <span>To: </span>
            <select
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {currencies.map((i: string) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label>
            <span>Amount: </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <br />
          <br />
          <span>Converted: {converted} </span>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <br />
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Open History
        </Button>
        <SimpleDialog onClose={handleClose} open={open} />
      </div>
    </div>
  );
}

export default App;
