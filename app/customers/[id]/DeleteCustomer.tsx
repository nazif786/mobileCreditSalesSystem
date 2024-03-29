"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Spinner from "@/app/components/ui/Spinner";
import { DeleteIcon } from "@/app/components/ui/svg/DeleteIcon";

const DeleteCustomer = ({ customerId }: { customerId: number }) => {
  const [err, setErr] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteCustomer = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/customers/${customerId}`);
      router.push("/customers");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      console.log(error);
      setErr(true);
    }
  };
  return (
    <>
      <Button
        className="w-[100%]"
        color="danger"
        disabled={isDeleting}
        onPress={onOpen}
      >
        <DeleteIcon fontSize={16} />
        Delete {isDeleting && <Spinner />}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Customer
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure to delete this customer, the data will be lost
                  forever?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={deleteCustomer}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* ////////////////////////////// */}
    </>
  );
};

export default DeleteCustomer;
