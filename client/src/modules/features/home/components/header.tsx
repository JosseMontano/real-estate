import { primaryColor } from "@/core/constants/colors";
import Btn from "@/core/components/form/button";
import useNavigation from "@/core/hooks/useNavigate";
import { NavLink } from "@/features/home/components/navLink";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/core/store/language";
import { Link } from "react-scroll";

interface Links {
  href: string;
  name: string;
}

type ParamsType = { links: Links[] };
export const Header = ({ links }: ParamsType) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { texts } = useLanguageStore();

  const { handleNavigate } = useNavigation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed flex justify-center w-full left-0 top-0 z-[999] transition-colors duration-300 ${
        isScrolled ? "bg-black text-white" : "bg-transparent text-white "
      }`}
    >
      <div className="container py-4 lg:p-4 flex justify-evenly md:items-center items-start">
        <div className="text-2xl font-bold">InmoApp</div>
        <nav
          className={`md:space-x-6 hidden flex-row md:flex`}
        >
          {links.map((linkText, index) => (
            <Link to={linkText.href} smooth={true} duration={500}>
              <NavLink key={index} href="#" primaryColor={primaryColor}>
                {linkText.name}
              </NavLink>
            </Link>
          ))}
        </nav>
        <div className="w-[180px]">
          <Btn
            text={texts.languageHeadeBtn}
            isPending={false}
            className="  cursor-pointer"
            onClick={() => handleNavigate("/profile")}
          />
        </div>
      </div>
    </header>
  );
};
