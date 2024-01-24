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

const DeleteEmployee = ({ employeeId }: { employeeId: number }) => {
  const [err, setErr] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteEmployee = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/employees/${employeeId}`);
      router.push("/employees");
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
                Delete Employee
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure to delete this employee, the data will be lost
                  forever?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={deleteEmployee}>
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

export default DeleteEmployee;
