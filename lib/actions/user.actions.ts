'use server';

import { SignUpParams } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";

export const signIn = async () => {
    try {
        
    } catch (error) {
        console.log("Error", error);
    }
}

export const signUp = async (userData : SignUpParams) => {
    try {
         const { account } = await createAdminClient();

  await account.create({
    userId: ID.unique(),
    email,
    password,
    name
  });
  const session = await account.createEmailPasswordSession({
    email,
    password
  });
    } catch (error) {
        console.log('Error', error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
