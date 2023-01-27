"use client"
import Link from "next/link";
import { useState } from 'react'


const menuList = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  {
    name: "Sports",
    href: "/category/sports",
    subMenu: [
      { name: "Football", href: "/category/sports/football" },
      { name: "Basketball", href: "/category/sports/basketball" },
      { name: "Tennis", href: "/category/sports/tennis" },
    ],
  },
  {
    name: "Science",
    href: "/category/science",
    subMenu: [
      { name: "Physics", href: "/category/science/physics" },
      { name: "Chemistry", href: "/category/science/chemistry" },
      { name: "Biology", href: "/category/science/biology" },
      { name: "Astronomy", href: "/category/science/astronomy" },
      { name: "Geology", href: "/category/science/geology" },
    ],
  },
  {
    name: "History",
    href: "/category/history",
    subMenu: [
      { name: "Ancient History", href: "/category/history/ancient" },
      { name: "Medieval History", href: "/category/history/medieval" },
      { name: "World War", href: "/category/history/world-war" },
      { name: "US History", href: "/category/history/us-history" },
      { name: "Asian History", href: "/category/history/asian-history" },
    ],
  },
  {
    name: "Health",
    href: "/category/health",
    subMenu: [
      { name: "Mental Health", href: "/category/health/mental-health" },
      { name: "Physical Health", href: "/category/health/physical-health" },
      { name: "Nutrition", href: "/category/health/nutrition" },
      { name: "Disease", href: "/category/health/disease" },
      { name: "Alternative Medicine", href: "/category/health/alternative-medicine" },
    ],
  },
  {
    name: "Technology",
    href: "/category/technology",
    subMenu: [
      { name: "Artificial Intelligence", href: "/category/technology/artificial-intelligence" },
      { name: "Robotics", href: "/category/technology/robotics" },
      { name: "Virtual Reality", href: "/category/technology/virtual-reality" },
      { name: "Cybersecurity", href: "/category/technology/cybersecurity" },
      { name: "Blockchain", href: "/category/technology/blockchain" },
    ],
  },
  {
    name: "Society",
    href: "/category/society",
    subMenu: [
      { name: "Politics", href: "/category/society/politics" },
      { name: "Economics", href: "/category/society/economics" },
      { name: "Sociology", href: "/category/society/sociology" },
      { name: "Philosophy", href: "/category/society/philosophy" },
      { name: "Ethics", href: "/category/society/ethics" },
    ],
  }
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState("");
  // const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleMouseEnter = (name: string) => {
    setMenuOpen(name)
  }

  return (
    <nav className="py-3 sticky top-0 left-0 z-50 bg-[#4c8fc0] px-10">
      <ul className="hidden lg:flex">
        {menuList.map((item) => (
          <li key={item.name}
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={() => setMenuOpen("")}
          >
            {!item.subMenu ? (
              <Link href={item.href} className="px-2 text-white font-medium hover:text-red-500">
                {item.name}
              </Link>
            ) : (
              <div className="relative">
                <button className={`px-2 font-medium ${menuOpen===item.name ? "text-gray-700" : "text-white"} flex items-center justify-center`}>
                  {item.name}
                  <svg className={`w-5 h-5 ml-1 fill-current text-white font-medium ${menuOpen===item.name ? "rotate-0 text-gray-700" : "rotate-180 transition-all duration-700"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </button>
                {menuOpen === item.name && (
                  <ul className="absolute z-50 bg-[#4c8fc0] py-2 rounded-sm shadow-xl px-2 w-72 columns-2">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.name} className="px-3 py-2">
                        <Link href={subItem.href} className="block px-3 py-2 text-white font-medium hover:text-gray-700">
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default Header;