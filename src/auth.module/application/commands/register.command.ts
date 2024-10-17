export const registerCommand = async (
  email: string,
  password: string,
  name: string
) => {
 
  const newUser = {
    id: "USER_ID_GENERADO",
    email,
    name,
  };

  return newUser;
};
