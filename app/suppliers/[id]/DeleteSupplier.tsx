"use client";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
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

interface Props {
  supplierId: number;
  supplierName: string;
}

const DeleteSupplier = ({ supplierId, supplierName }: Props) => {
  const [err, setErr] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const DeleteSupplier = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/suppliers/${supplierId}`);
      router.push("/suppliers");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      console.log(error);
      setErr(true);
    }
  };
  if (!supplierId) return notFound();
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
                Delete Supplier
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure to delete supplier:{" "}
                  <span className="font-bold text-danger">{supplierName}</span>?
                  the related data will be lost forever?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={DeleteSupplier}>
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

export default DeleteSupplier;
