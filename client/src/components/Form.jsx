import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Form = ({ handleSubmit, handleChange, data }) => {
  return (
    <>
      <FormControl
        boxShadow={"md"}
        p={4}
        width={{ base: "97%", sm: "80%", md: "50%" }}
        m={"auto"}
      >
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            isRequired
            placeholder={"Enter Name"}
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <FormLabel htmlFor="phoneNumber">Phone</FormLabel>
          <Input
            type="text"
            id="phoneNumber"
            placeholder={"Enter Phone Number"}
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
          />
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="text"
            id="email"
            placeholder={"Enter Email"}
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <FormLabel htmlFor="hobbies">Hobbies</FormLabel>
          <Input
            type="text"
            id="hobbies"
            placeholder={"Enter Hobbies"}
            name="hobbies"
            value={data.hobbies}
            onChange={handleChange}
          />
          <Button colorScheme={"blue"} mt={4} type="submit">
            Save
          </Button>
        </form>
      </FormControl>
    </>
  );
};

export default Form;
