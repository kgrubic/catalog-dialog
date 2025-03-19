function Header() {
  return (
    <>
      <div className="flex justify-between items-center border-1 border-solid w-full h-24">
        <div className="left-0 m-4">Actions type</div>
        <div className="border-1 border-solid w-96 h-[50px] right-0 m-4">
          <input
            className="w-96 h-[50px] placeholder:p-2"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
