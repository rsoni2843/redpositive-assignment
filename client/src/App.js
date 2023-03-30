import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import TableData from "./components/TableData";
import Buttons from "./components/Buttons";
import { Text } from "@chakra-ui/react";

function App() {
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      let res = await axios.get("http://localhost:8000/users");
      setLoading(false);
      setUsers(res.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // Handlinginput changes here
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  // Sending email here

  // Creating the task here
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    axios
      .post("http://localhost:8000/users", {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        hobbies: data.hobbies,
      })
      .then((res) => {
        setLoading(false);
        setUsers([...users, res.data]);
        setData({ name: "", phoneNumber: "", email: "", hobbies: "" });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  console.log(users);

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete("http://localhost:8000/users/" + id)
      .then((res) => {
        setLoading(false);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // Updating the task here
  const handleUpdate = (id) => {
    setLoading(true);
    const { name, email, phoneNumber, hobbies } = data;
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phoneNumber) updatedData.phoneNumber = phoneNumber;
    if (hobbies) updatedData.hobbies = hobbies;

    axios
      .put("http://localhost:8000/users/" + id, updatedData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUsers(users.map((user) => (user._id === id ? res.data : user)));
        setData({ name: "", phoneNumber: "", email: "", hobbies: "" });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Text
        fontWeight={"bold"}
        fontSize={"3xl"}
        textDecoration={"underline"}
        color={"red"}
      >
        Redpositive service Assignment
      </Text>
      <Text fontWeight={600} fontSize={"2xl"}>
        CRUDS(Create, Read, Update, Delete and Send)
      </Text>
      <Form
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <TableData
        loading={loading}
        users={users}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <Buttons
        data={data}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
