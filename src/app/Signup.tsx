import React, { useContext, useState } from "react";
import { GlobalStateContext } from ".";
import { useNavigate } from "react-router-dom";
import api from "./api";

const initialState = {
  Name: "",
  Username: "",
  Email: "",
  Phone: "",
  Website: "",
  Street: "",
  Suite: "",
  City: "",
  Zipcode: "",
  CompanyName: "",
  CatchPhrase: "",
  Bs: "",
};
export default function Signup() {
  const [fields, setFields] = useState(initialState);
  const navigate = useNavigate();
  const { globalState, setGlobalState }: any = useContext(GlobalStateContext);
  const handleChange = (e: any, id: string) => {
    const newFields = { ...fields };
    (newFields as any)[id] = e.target.value;
    setFields(newFields);
  };
  const onFormSubmit = async (e: any) => {
    let toSend: any = {};
    Object.keys(fields).map((each: string) => {
      toSend[each.toLowerCase()] = (fields as any)[each];
      return each;
    });
    console.log(toSend);
    try {
      let dd = await api.post("/users", {
        data: toSend,
      });
      toSend["id"] = [dd.data.id];
      onAddUser(toSend);
      setFields(initialState);
      console.log(dd);
    } catch (e) {
      console.log(e);
    }
  };
  // add user after signup
  const onAddUser = (user: any) => {
    let newUsers = [...globalState.data.users];
    // convert to proper data format
    const u = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.street,
        suite: user.suite,
        city: user.city,
        zipcode: user.zipcode,
        geo: {
          lat: "-31.8129", // fake
          lng: "62.5342",
        },
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.companyname,
        catchPhrase: user.catchphrase,
        bs: user.bs,
      },
    };
    newUsers.push(u);
    alert("User created successfully :)");
    // setData({ ...data, data: { ...data.data, users: newUsers } });
    setGlobalState({
      ...globalState,
      data: { ...globalState.data, users: newUsers },
    });
  };
  const {
    Name,
    Username,
    Email,
    Phone,
    Website,
    Street,
    Suite,
    City,
    Zipcode,
    CompanyName,
    CatchPhrase,
    Bs,
  } = fields;

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="signup">
      <div className="header">
        <h1>Signup.</h1>
        <button onClick={goBack}>Cancel</button>
      </div>
      <p>I am not doing any form validation for now.</p>
      <form onSubmit={onFormSubmit}>
        <section>
          <h3>User Details</h3>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="Name"
            id="Name"
            value={Name}
            onChange={(e) => handleChange(e, "Name")}
          />
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            id="Username"
            value={Username}
            onChange={(e) => handleChange(e, "Username")}
          />
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="Email"
            id="Email"
            value={Email}
            onChange={(e) => handleChange(e, "Email")}
          />
          <label htmlFor="Phone">Phone</label>
          <input
            type="phone"
            placeholder="Phone"
            name="Phone"
            id="Phone"
            value={Phone}
            onChange={(e) => handleChange(e, "Phone")}
          />
          <label htmlFor="Website">Website</label>
          <input
            type="url"
            placeholder="Website"
            name="Website"
            id="Website"
            value={Website}
            onChange={(e) => handleChange(e, "Website")}
          />
        </section>
        <section>
          <h3>Address Details</h3>
          <label htmlFor="Street">Street</label>
          <input
            type="text"
            placeholder="Street"
            name="Street"
            id="Street"
            value={Street}
            onChange={(e) => handleChange(e, "Street")}
          />
          <label htmlFor="Suite">Suite</label>
          <input
            type="text"
            placeholder="Suite"
            name="Suite"
            id="Suite"
            value={Suite}
            onChange={(e) => handleChange(e, "Suite")}
          />
          <label htmlFor="City">City</label>
          <input
            type="text"
            placeholder="City"
            name="City"
            id="City"
            value={City}
            onChange={(e) => handleChange(e, "City")}
          />

          <label htmlFor="Zipcode">Zipcode</label>
          <input
            type="text"
            placeholder="Zipcode"
            name="Zipcode"
            id="Zipcode"
            value={Zipcode}
            onChange={(e) => handleChange(e, "Zipcode")}
          />
        </section>
        <section>
          <h3>Occupation</h3>
          <label htmlFor="CompanyName">Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            name="CompanyName"
            id="CompanyName"
            value={CompanyName}
            onChange={(e) => handleChange(e, "CompanyName")}
          />
          <label htmlFor="CatchPhrase">Catch Phrase</label>
          <input
            type="text"
            placeholder="Catch Phrase"
            name="CatchPhrase"
            id="CatchPhrase"
            value={CatchPhrase}
            onChange={(e) => handleChange(e, "CatchPhrase")}
          />
          <label htmlFor="Bs">Bs</label>
          <input
            type="text"
            placeholder="BS"
            name="Bs"
            id="Bs"
            value={Bs}
            onChange={(e) => handleChange(e, "Bs")}
          />
          <button type="button" onClick={onFormSubmit}>
            Sign up
          </button>
        </section>
      </form>
    </div>
  );
}
