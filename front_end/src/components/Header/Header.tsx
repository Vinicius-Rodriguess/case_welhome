import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-lg">
      <div className="w-full flex px-10 py-10">
          <Image
            src={"/assets/logo_welhome.webp"}
            alt="Logo Welhome"
            width={300}
            height={100}
          />
      </div>
    </header>
  );
};

export default Header;
