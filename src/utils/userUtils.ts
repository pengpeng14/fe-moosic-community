const getUserData = () => {
  const user = localStorage.getItem("userData");
  if (user) {
    const userData = JSON.parse(user);
    return userData;
  }
};

export default { getUserData };
