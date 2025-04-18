import * as bcrypt from "bcrypt";

const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {
    console.error(`Failed to verify password : ${error}`);
    throw error;
  }
};

export default verifyPassword;
