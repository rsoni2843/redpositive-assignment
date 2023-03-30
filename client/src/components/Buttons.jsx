import React from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  FormControl,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
const Buttons = (props) => {
  const { data, handleSubmit, handleChange } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const api = "https://backend-deploying-redpositive-rsoni2843.vercel.app/";
  const handleSendEmail = () => {
    const selectedRows = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const selectedData = [];

    selectedRows.forEach((row) => {
      const id =
        row.parentNode.parentNode.querySelector("td:nth-child(2)")?.textContent;
      const name =
        row.parentNode.parentNode.querySelector("td:nth-child(3)")?.textContent;
      const phone =
        row.parentNode.parentNode.querySelector("td:nth-child(4)")?.textContent;
      const email =
        row.parentNode.parentNode.querySelector("td:nth-child(5)")?.textContent;
      const hobbies =
        row.parentNode.parentNode.querySelector("td:nth-child(6)")?.textContent;

      selectedData.push({ id, name, phone, email, hobbies });
    });

    axios
      .post(api + "email", { data: selectedData })
      .then((res) => {
        toast({
          title: "Email Sent Successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button mr={2} mt={4} onClick={onOpen}>
        Add New Data
      </Button>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  value={data.name}
                  name="name"
                  id="name"
                  onChange={handleChange}
                  required
                />
                <br />
                <FormLabel>Phone Number:</FormLabel>
                <Input
                  type="text"
                  value={data.phoneNumber}
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={handleChange}
                  required
                />
                <br />
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  value={data.email}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  required
                />
                <br />
                <FormLabel>Hobbies:</FormLabel>
                <Input
                  type="text"
                  value={data.hobbies}
                  name="hobbies"
                  id="hobbies"
                  onChange={handleChange}
                  required
                />
                <br />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <Button mt={4} onClick={handleSendEmail}>
        Send Mail
      </Button>
    </>
  );
};

export default Buttons;
