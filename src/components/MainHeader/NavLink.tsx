import React from "react";

interface NavLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ onClick, children, ...props }) => {
  return (
    <a
      className="hover:text-[#075df5] cursor-pointer"
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default NavLink;
