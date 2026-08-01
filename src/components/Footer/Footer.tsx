import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logo } from '../index';

const Footer = () => {
  const authStatus = useSelector((state: any) => state.auth.status);

  const links = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Your Posts", slug: "/user-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Sign Up", slug: "/signup", active: !authStatus },
  ];

  return (
    <footer id='footer'>
      <section className="relative overflow-hidden py-10 bg-(--surface) border border-x-0 border-y-2 border-y-(--border)">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <Logo className="w-[40%]" />
              <p className="text-sm text-(--text-muted)">
                &copy; Copyright 2026. All Rights Reserved by ShinCodes.
              </p>
            </div>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {links.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <Link
                      className="text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to={item.slug}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
