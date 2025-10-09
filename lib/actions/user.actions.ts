"use server";

import { signInProps, SignUpParams } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import path from "path";
import { parseStringify } from "../utils";
import { email } from "zod";
import { redirect } from "next/navigation";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.log("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log("Error", error);
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    await account.deleteSession("current");

    (await cookies()).delete("appwrite-session");
    
  } catch (error) {
    return null;
  }
};
