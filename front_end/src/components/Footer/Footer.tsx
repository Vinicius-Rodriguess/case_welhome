import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#E86F4B] text-white mt-10">
      <div className="w-full flex px-10 py-10">
          <Image
            src={"/assets/logo_welhome_icon.webp"}
            alt="Logo Welhome"
            width={100}
            height={50}
          />
      </div>

      <div className="bg-gray-800 text-white text-center text-xs py-2 mt-4">
        © 2025 Todos os direitos reservados para welhome
      </div>
    </footer>
  );
};

export default Footer;
