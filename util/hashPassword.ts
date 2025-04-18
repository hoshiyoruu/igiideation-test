import * as bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error: any) {
    console.error("Error hashing password :", error);
    throw error;
  }
};

export default hashPassword;
