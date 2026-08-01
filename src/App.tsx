import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header, OverlayLoader, ThemeController } from './components';
import { Outlet } from 'react-router-dom';
import { setLoading } from './store/uxSlice';
import newService from './appwrite/config';
import { setUserSlugs } from './store/postSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        dispatch(setLoading(true));
        const userData = await authService.getCurrentUser();
        if (userData) {
          const userSlugs = await newService.getSlugsByUserId(userData.$id);

          if (userSlugs) {
            dispatch(setUserSlugs(userSlugs));
          }
          dispatch(login(userData));
        }
        else {
          dispatch(logout());
        };
      }
      catch (err) {
        console.error(err);
        dispatch(logout());
      }
      finally {
        dispatch(setLoading(false));
      };
    };

    checkUser();
  }, []);

  return (
    <OverlayLoader>
      <ThemeController />

      <div className="flex flex-col bg-(--bg) text-(--text)">

          <Header />

          <main>
            <Outlet />
          </main>

          <Footer />
      </div>

    </OverlayLoader>
  )
}

export default App
