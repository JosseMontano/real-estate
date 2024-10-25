type ParamsType = {
  href: string | undefined;
  children: string;
  primaryColor: string;
};
export const NavLink = ({ children, href, primaryColor }: ParamsType) => {
  return (
    <a
      href={href}
      style={{ "--hover-color": primaryColor } as React.CSSProperties}
      className="hover:text-[var(--hover-color)]"
    >
      {children}
    </a>
  );
};
