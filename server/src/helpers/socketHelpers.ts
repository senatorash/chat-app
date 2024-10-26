const users: { username: string; room: string }[] = [];

export const userJoin = (id: string, username: string, room: string) => {
  const user = { id, username, room };

  const findUserExistIndex = users.findIndex(
    (user) => user.username === username
  );

  if (findUserExistIndex >= 0) {
    users[findUserExistIndex] = user;
    return user;
  }

  users.push(user);

  return user;
};

// get a current user from a particular room
export const getCurrentUser = (username: string) => {
  return users.find((user) => user.username === username);
};

// get all uses in a particular room
export const getRoomUsers = (room: string) => {
  return users.filter((users) => users.room === room);
};
