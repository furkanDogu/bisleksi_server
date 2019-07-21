const levels = [{ game_id: "1", level: 5 }];
const usersArr = [
  {
    id: "123",
    email: "furkandogu35@gmail.com",
    name: "furkan",
    surname: "doğu",
    password: "123123",
    profileName: "furki",
    birthday: "050505",
    levels
  }
];

const sayHi = (_: Object, args: any): string => `Hi ${args.name}`;
const users = () => usersArr;

export default {
  Query: {
    sayHi,
    users
  }
};
