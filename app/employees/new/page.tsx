import EmpForm from "../_components/EmpForm";

const page = () => {
  return (
    <>
      <div className="mb-12 ml-5 text-center">
        <h2 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500">
          New Employee Form
        </h2>
      </div>
      <EmpForm />
    </>
  );
};

export default page;
