import Image from "next/image";
import { TbBrandInstagram } from "react-icons/tb";

export const Footer = () => {
  return (
    <footer className="mt-32 shadow-inner pb-14 pt-16 gap-12">
      <div className="container-app">
        <div className="flex justify-between gap-8 flex-wrap">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="SWY35 Türkiye Delegation logo"
              width={100}
              height={100}
            />

            <div className="flex flex-col">
              <span className="text-lg font-bold">SWY35 Türkiye</span>
              <span className="text-black/50 text-sm">
                One ship, many journeys, endless connections!
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.instagram.com/swy35_turkiye"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/5 rounded-full p-3"
            >
              <TbBrandInstagram size={24} />
            </a>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://linkedin.com/in/abdulbaki-dursun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black/50 hover:text-black"
          >
            Website made with ❤️ by Abdulbaki Dursun
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
