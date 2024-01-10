import { Button, Link } from "@nextui-org/react";

const Customers = () => {
  return (
    <>
      <div>Customers</div>
      <Button>
        <Link href="/customers/new">Register new customer </Link>
      </Button>
    </>
  );
};

export default Customers;
