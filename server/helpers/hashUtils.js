import bcrypt from 'bcrypt';

export const hashString = async(string) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(string, saltRounds);
  } catch (error) {
    throw error;
  }
}

export const compareHash = async(string, hashString) => {
  try {
    return bcrypt.compare(string, hashString);
  } catch (error) {
    throw error;
  }
}