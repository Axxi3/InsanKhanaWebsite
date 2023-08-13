import React, { useEffect, useState } from "react";
import { useJwt, isExpired, decodeToken } from "react-jwt";
import Loading from "./Loading";
export default function NotwrotePaymentinfo() {
  const [load, setload] = useState(false);
  const [credentials, setcredentials] = useState({
    name: "",
    Number: "",
    Type: "",
  });

  const [auth, setauth] = useState("");

  useEffect(() => {
    let auth = localStorage.getItem("authToken");
    let id = "";
    // console.log(storedCartData)

    if (auth === null) {
      // This will still show the previous value of login (useState is asynchronous)
    } else {
      const myDecodedToken = decodeToken(auth);
      const isMyTokenExpired = isExpired(auth);

      id = myDecodedToken.user.id;
      setauth(id);
      if (myDecodedToken !== null) {
        // console.log(myDecodedToken.user.id)
        // realtoken(myDecodedToken.user.id)
      }
    }
    console.log("fhfhf", id);
  }, []);

  const optionsArray = ["Master Card", "Visa Card"];
  const changeValue = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const SubmitHogaya = async (event) => {
    setload(true);

    try {
      const respo = await fetch("http://localhost:5000/addcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          number: credentials.Number,
          type: credentials.Type,
          id: auth,
        }),
      });

      const res = await respo.json();
      console.log(res);

      if (!res.success) {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.log(error);
    }
    setload(false);
  };

  return (
    <div className="rightforparentcart addressform">
      {load && <Loading />}
      {load === false && (
        <div>
          <h1>Enter your card Details</h1>
          <div className="form">
            <form className="row g-3" onSubmit={SubmitHogaya}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Type your name"
                  name="name"
                  value={credentials.name}
                  onChange={changeValue}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Card Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 4567 8902 2322"
                  name="Number"
                  value={credentials.Number}
                  onChange={changeValue}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  Type
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="Type"
                  value={credentials.Type}
                  onChange={changeValue}
                >
                  <option selected>Choose...</option>
                  {optionsArray.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    I agree to the Terms & conditions
                  </label>
                </div>
              </div>
              <div className="col-12 ">
                <button type="submit" className="btn btn-primary ">
                  Put my Card details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
