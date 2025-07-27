function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
      <div className="w-20 h-20 border-[5px] border-white border-b-[5px] border-b-base-content rounded-full animate-[rotation_1s_linear_infinite]"></div>
    </div>
  );
}

export default Spinner;
