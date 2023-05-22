import userStyles from "./Headers.module.scss";
import reserveImg from "../../assets/reserveImg.jpg";

import { FC, HTMLAttributes, useState } from "react";

import Button from "../../components/ui/buttons/Button";

interface UserProps extends HTMLAttributes<HTMLDivElement> {
  avatarSource?: string;
  isAuth: boolean;
}

const User: FC<UserProps> = ({ avatarSource, isAuth }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(isAuth);

  return (
    <div className={userStyles.user}>
      <div
        className={userStyles.avatar}
        style={{
          backgroundImage: `url(${avatarSource ? avatarSource : reserveImg})`,
        }}
      >
        {isSignedIn ? (
          <Button
            label="Log Out"
            isDanger={true}
            className={userStyles.login}
            onClick={() => setIsSignedIn(!isSignedIn)}
            style={{ fontSize: "18px" }}
          />
        ) : (
          <Button
            label="Sign In"
            // link="/login"
            isSuccess={true}
            className={userStyles.login}
            onClick={() => setIsSignedIn(!isSignedIn)}
          />
        )}
      </div>
    </div>
  );
};

export default User;
