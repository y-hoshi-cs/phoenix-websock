import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { RoomContext } from '../components/providers/Room.provider';
import Toggle from '../components/Toggle';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserIcon } from '@heroicons/react/20/solid';
import Dropdown from '../components/Dropdown';

const DARK_COOKIE_KEY = 'isDark';
const DARK_CLASS_NAME = 'dark';

const App = () => {
  const { user, createSingleRoom, forgetUserName } = useContext(RoomContext);

  // const [isDark, setIsDark] = useState(false);
  const [cookies, setCookie] = useCookies();

  const [nameInput, setNameInput] = useState('');

  const isDark = useMemo<boolean>(() => {
    return cookies[DARK_COOKIE_KEY] || false;
  }, [cookies]);

  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setNameInput(v);
  };

  const onCreateRoom = useCallback(async () => {
    createSingleRoom(nameInput);
    setNameInput('');
  }, [nameInput, createSingleRoom]);

  const onClickButton = useCallback(() => {
    onCreateRoom();
  }, [onCreateRoom]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onCreateRoom();
      }
    },
    [onCreateRoom]
  );

  const onToggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const html: HTMLElement = document.querySelector('html')!;
    if (e.target.checked) {
      html.classList.add(DARK_CLASS_NAME);
      // setIsDark(true);
      setCookie(DARK_COOKIE_KEY, true);
    } else {
      html.classList.remove(DARK_CLASS_NAME);
      // setIsDark(false);
      setCookie(DARK_COOKIE_KEY, false);
    }
  };

  useEffect(() => {
    if (cookies.isDark) {
      const html: HTMLElement = document.querySelector('html')!;
      html.classList.add(DARK_CLASS_NAME);
      // setIsDark(true);
    }
  }, [cookies]);

  return (
    <section className="text-black dark:text-white bg-slate-100 dark:bg-teal-950">
      <header className="p-2 flex border-b border-1 bg-slate-300 dark:bg-teal-950">
        <div className="font-bold">Rts Chat</div>
        <div className="flex-1 px-2 space-x-2">
          {user && (
            <>
              <Input
                onKeyDown={onKeyDown}
                onChange={onChangeNameInput}
                value={nameInput}
              />
              <Button onClick={onClickButton}>CreateRoom</Button>
            </>
          )}
        </div>
        <div className="flex">
          {user && (
            <div className="m-auto">
              <Dropdown
                align="right"
                userName={user?.userName}
                onClickForget={forgetUserName}
              >
                <UserIcon className=" w-8 h-8 m-auto rounded-full border mr-2" />
              </Dropdown>
            </div>
          )}
          <Toggle defaultChecked={!isDark} onChange={onToggleTheme} />
        </div>
      </header>
      <main className="h-full">
        <Outlet />
      </main>
    </section>
  );
};

export default App;
