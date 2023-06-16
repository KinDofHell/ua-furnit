import userStyles from "./Headers.module.scss";
import reserveImg from "../../assets/reserveImg.jpg";

import { FC, HTMLAttributes, useContext, useState } from "react";
import { AuthContext } from "../authContext/AuthContext";

import Button from "../../components/ui/buttons/Button";
import LoginModal from "../../components/modal/LoginModal";

interface UserProps extends HTMLAttributes<HTMLDivElement> {
  avatarSource?: string;
  isAuth: boolean;
}

const User: FC<UserProps> = ({ avatarSource, isAuth }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  console.log(isAuthenticated);

  return (
    <div className={userStyles.user}>
      <div
        className={userStyles.avatar}
        style={{
          backgroundImage: `url(${avatarSource ? avatarSource : reserveImg})`,
        }}
      >
        {isAuthenticated ? (
          <Button
            label="Log Out"
            isDanger={true}
            className={userStyles.login}
            onClick={logout}
            style={{ fontSize: "18px" }}
          />
        ) : (
          <Button
            label="Sign In"
            isSuccess={true}
            className={userStyles.login}
            onClick={() => setLoginModalOpen(true)}
          />
        )}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default User;
