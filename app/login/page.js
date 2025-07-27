import SigninButton from "../_components/SigninButton";

function page() {
  return (
    <div className="p-18 flex flex-col gap-20 text-2xl justify-center items-center">
      <div className=" text-5xl">Login to access your account</div>
      <SigninButton />
    </div>
  );
}

export default page;
