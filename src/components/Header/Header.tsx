import { useSelector } from 'react-redux';
import { LogoutButton, Container, Logo } from '../index';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ThemeButton from './ThemeButton';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((x: any) => x.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState<number>();
  const ref = useRef(null);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `
    px-6 py-2 rounded-full whitespace-nowrap border transition-all duration-300 ${isActive
      ? "bg-(--primary) text-white border-(--primary)"
      : "text-(--text) border-transparent hover:border-(--primary) hover:text-(--primary)"
    }
  `;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `
    block px-6 py-2 mid rounded-full border transition-all duration-300 ${isActive
      ? "bg-(--primary) text-white border-(--primary)"
      : "text-(--text) border-(--primary)"
    }
  `;

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Your posts", slug: "/user-posts", active: authStatus },
    { name: "All posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus }
  ];

  useEffect(() => {
    if (ref.current) {
      setTopBarHeight((ref.current as HTMLElement).offsetHeight+160);
    }
  }, []);

  return (
    <header className="py-3 shadow bg-(--surface) text-(--text)">
      <Container>

        <nav className="flex items-center justify-between">

          <Link to="/">
            <Logo className="w-10" />
          </Link>

          <div className="hidden md:block">
            <ul className="flex gap-2 mid">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="shrink-0">
                    <NavLink
                      className={navLinkClass}
                      to={item.slug}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              <li className="shrink-0">
                <ThemeButton />
              </li>
              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>

          <button
            className="md:hidden px-4 text-(--text) text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </nav>


        <div
          style={{
            maxHeight: menuOpen ? `${topBarHeight}px` : '0px'
          }}
          className="md:hidden overflow-hidden transition-all duration-350 ease-in-out"
        >
          <div className="mt-6 pb-4 flex justify-between" id="topBar" ref={ref}>
            <ul className="flex flex-col gap-8">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className='text-xl'>
                    <NavLink
                      to={item.slug}
                      onClick={() => setMenuOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
            </ul>
            <ul className='flex flex-col gap-8 items-end'>
              <li className="shrink-0 text-xl">
                <ThemeButton />
              </li>
              {authStatus && (
                <li className='text-xl'>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        </div>


      </Container>
    </header>
  );
};

export default Header;