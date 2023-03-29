import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Define a regular expression for email validation
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  // Define a regular expression for phone number validation
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users]);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleHobbiesChange = (e) => setHobbies(e.target.value);

  const handleSendEmail = () => {
    const selectedRows = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    const selectedData = [];

    selectedRows.forEach((row) => {
      const id =
        row.parentNode.parentNode.querySelector("td:nth-child(2)").textContent;
      const name =
        row.parentNode.parentNode.querySelector("td:nth-child(3)").textContent;
      const phone =
        row.parentNode.parentNode.querySelector("td:nth-child(4)").textContent;
      const email =
        row.parentNode.parentNode.querySelector("td:nth-child(5)").textContent;
      const hobbies =
        row.parentNode.parentNode.querySelector("td:nth-child(6)").textContent;

      selectedData.push({ id, name, phone, email, hobbies });
    });

    axios
      .post("http://localhost:8000/email", { data: selectedData })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    console.log(phone);
    e.preventDefault();
    axios
      .post("http://localhost:8000/users", {
        name: name,
        phoneNumber: phone,
        email: email,
        hobbies: hobbies,
      })
      .then((res) => {
        setUsers([...users, res.data]);
        setName("");
        setPhone("");
        setEmail("");
        setHobbies("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/users/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleUpdate = (id) => {
    axios
      .put("http://localhost:8000/users/" + id, {
        name: name,
        phoneNumber: phone,
        email: email,
        hobbies: hobbies,
      })
      .then((res) => {
        setName("");
        setPhone("");
        setEmail("");
        setHobbies("");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="hobbies">Hobbies</label>
        <input
          type="text"
          id="hobbies"
          value={hobbies}
          onChange={handleHobbiesChange}
        />
        <button type="submit">Save</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Hobbies</th>
            <th>Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.hobbies}</td>
              <td>
                <button onClick={() => handleUpdate(user._id)}>Update</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setModalIsOpen(true)}>Add New Data</button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
          <br />
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            required
            pattern={phoneRegex}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            pattern={emailRegex}
          />
          <br />
          <label>Hobbies:</label>
          <input
            type="text"
            value={hobbies}
            onChange={handleHobbiesChange}
            required
          />
          <br />
          <button type="submit">Save</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
      <button onClick={handleSendEmail}>Send Mail</button>
    </div>
  );
}

export default App;
