import { useSelector } from "react-redux";
export default function Home() {
  const { user } = useSelector((state) => state.userData);
  const { name, role, email, address } = user;
  return (
    <main>
      {/* <p>name:{name}</p>
      <p>role:{role}</p>
      <p>email:{email}</p>
      <p>address:{address}</p> */}
    </main>
  );
}
/*
Admin:
admin@a.com
Admin@123

Store:
storeowner@a.com
Store@123
*/
