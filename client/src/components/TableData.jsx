import {
  Button,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const TableData = ({ users, handleUpdate, handleDelete, loading }) => {
  console.log(loading);
  if (loading) {
    return (
      <Skeleton
        minH={"50vh"}
        width={{ base: "100%", sm: "90%", md: "80%" }}
        m={"auto"}
        mt={4}
      />
    );
  }
  return (
    <>
      <Table
        width={{ base: "100%", sm: "90%", md: "80%" }}
        m={"auto"}
        mt={4}
        boxShadow="md"
        p={4}
      >
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Email</Th>
            <Th>Hobbies</Th>
            <Th>Update/Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user._id}>
              <Td>
                <input type="checkbox" />
              </Td>
              <Td>{user._id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>{user.email}</Td>
              <Td>{user.hobbies}</Td>
              <Td>
                <Button mr={2} onClick={() => handleUpdate(user._id)}>
                  Update
                </Button>
                <Button
                  colorScheme={"red"}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default TableData;
