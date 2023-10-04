import React, { useState } from 'react';
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    id: '',
    username: '',
    secondName: '',
    email: '',
    age: ''
  });

  const validate = () => {
    const errors = {};

    if (!formValues.username || formValues.username.length < 4) {
      errors.username = "Username should have at least 4 characters";
    }

    if (!formValues.secondName || formValues.secondName.length < 4) {
      errors.secondName = "Second Name should have at least 4 characters";
    }

    if (!formValues.email || !formValues.email.includes("gmail.com")) {
      errors.email = "Email should have @gmail.com";
    }

    if (!formValues.age || formValues.age < 18) {
      errors.age = "You should be at least 18 to register";
    }

    return errors;
  };

  const onFormValuesChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length === 0) {
      const newUser = {
        id: users.length + 1,
        username: formValues.username,
        secondName: formValues.secondName,
        email: formValues.email,
        age: formValues.age
      };

      setUsers([...users, newUser]);

      setFormValues({
        id: '',
        username: '',
        secondName: '',
        email: '',
        age: ''
      });
    } else {
      setFormErrors(errors);
    }
  };

  const onDelete = (event, id) => {
    event.preventDefault();
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const onEdit = (event, user) => {
    event.preventDefault();
    setFormValues(user);
  };

  const onSaveEdit = (event) => {
    event.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length === 0) {
      const userIndex = users.findIndex(u => u.id === formValues.id);

      const updatedUser = {
        ...users[userIndex],
        username: formValues.username,
        secondName: formValues.secondName,
        email: formValues.email,
        age: formValues.age
      };

      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;

      setUsers(updatedUsers);
      setFormValues({
        id: '',
        username: '',
        secondName: '',
        email: '',
        age: ''
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className='container'>
      <form className='registerForm'>
        <h2 className='registerText'>Register</h2>
        <div className='inputDiv'>
          <input
            name='username'
            className='input'
            placeholder='Username'
            value={formValues.username}
            onChange={onFormValuesChange}
          />

          {formErrors.username && <ErrorMessage text={formErrors.username} />}

          <input
            name='secondName'
            className='input'
            placeholder='Second Name'
            value={formValues.secondName}
            onChange={onFormValuesChange}
          />

          {formErrors.secondName && <ErrorMessage text={formErrors.secondName} />}

          <input
            name='email'
            className='input'
            placeholder='Email'
            value={formValues.email}
            onChange={onFormValuesChange}
          />

          {formErrors.email && <ErrorMessage text={formErrors.email} />}

          <input
            name='age'
            className='input'
            placeholder='Age'
            type='number'
            value={formValues.age}
            onChange={onFormValuesChange}
          />

          {formErrors.age && <ErrorMessage text={formErrors.age} />}
        </div>
        <div className='buttonsDiv'>
          <button className='btn' className='submit' onClick={onSubmit}>Add User</button>
          {formValues.id ? (
            <button className='btn' className='edit' onClick={onSaveEdit}>Save Edit</button>
          ) : null}
        </div>
      </form>
      <div className='userList'>
        <h2 style= {{color: "white"}} >User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{color: "white"}}>
              Username: {user.username}, {<br></br>}
              Second Name: {user.secondName}, {<br></br>}
              Email: {user.email}, {<br></br>}
              Age: {user.age} {<br></br>}
              <button className='btn' onClick={(event) => onEdit(event, user)}>Edit</button> <br></br>
              <button className='btn' onClick={(event) => onDelete(event, user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ErrorMessage = ({ text }) => {
  return <p style={{ color: "red" }}>{text}</p>;
};

export default App;
