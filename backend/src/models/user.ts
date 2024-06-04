import { db } from "../db";
import { User } from "../types/user";
import { Password } from "../types/password";

function userGetQuery() {
  return db
    .from("user")
    .leftJoin("profile", "user.id", "profile.user_id")
    .leftJoin("country", "profile.country_id", "country.id")
    .leftJoin("profile as manager", "profile.manager_id", "manager.id")
    .leftJoin("department", "profile.department_id", "department.id")
    .leftJoin("role", "user.role_id", "role.id")
    .leftJoin("password", "user.id", "password.user_id")
    .select({
      id: "user.id",
      username: "user.username",
      email: "user.email",
      role: "role.name",
      designation: "profile.designation",
      password: "password.password",
      isTemporaryPassword: "password.is_temporary",
      country: "country.name",
      countryCode: "country.code",
      countryId: "country.id",
      department: "department.name",
      departmentId: "department.id",
      name: "profile.name",
      address: "profile.address",
      phone: "profile.phone",
      managerId: "profile.manager_id",
      managerName: "manager.name",
      managerAddress: "manager.address",
      managerDesignation: "manager.designation",
    })
    .where("password.is_active", true);
}

/**
 * Get the last n inactive passwords of the user by their ID
 * @param id - The ID of the user
 * @param limit - The number of inactive passwords to return
 * @returns The last n inactive passwords of the user
 */
export async function getInactivePasswordsForUser(
  userId: number,
  limit: number = 5,
) {
  return await db
    .select("password")
    .from("password")
    .where({ id: userId, is_active: false })
    .orderBy("created_at", "desc")
    .limit(limit);
}

/**
 * get the user by their username
 * @param username - username or email of the user
 * @returns The user with the given username
 */
export async function getUserByUsername(
  username: string,
): Promise<(User & Password) | undefined> {
  return await userGetQuery()
    .where((q) =>
      q.where("user.username", username).orWhere("user.email", username),
    )
    .first();
}

/**
 * get the user by their ID
 * @param id - ID of the user
 * @returns The user with the given ID
 */
export async function getUserById(id: number): Promise<User & Password> {
  return await userGetQuery().where("user.id", id).first();
}

/**
 * get all users
 * @returns All users
 */
export async function getAllUsers(): Promise<(User & Password)[]> {
  return await userGetQuery();
}

/**
 * Update the password of a user
 * @param id - The ID of the user
 * @param newPassword - The new password
 */
export async function updatePassword(id: number, newPassword: string) {
  await db("password").where("user_id", id).update({ is_active: false });
  return await db("password").insert({
    user_id: id,
    password: newPassword,
    is_active: true,
    is_temporary: false,
  });
}

const WHERE_NAMES = {
  username: "user.username",
  email: "user.email",
  role: "role.name",
  roleId: "role.id",
  designation: "profile.designation",
  country: "country.name",
  countryCode: "country.code",
  countryId: "country.id",
  department: "department.name",
  name: "profile.name",
  address: "profile.address",
  phone: "profile.phone",
  managerId: "profile.manager_id",
  managerName: "manager.name",
  managerAddress: "manager.address",
  managerDesignation: "manager.designation",
} as const;
export type AllowableQuery = typeof WHERE_NAMES;

export async function search(
  query: Partial<Record<keyof AllowableQuery, string>> & { q: string },
) {
  const { q, ...rest } = query;

  const queryBuilder = userGetQuery();
  console.log("rest", rest);
  console.log("q", q);
  Object.entries(rest).forEach(([key, value]) => {
    if (WHERE_NAMES[key as keyof AllowableQuery] && Array.isArray(value)) {
      queryBuilder.whereIn(
        WHERE_NAMES[key as keyof AllowableQuery] as string,
        value,
      );
    } else if (WHERE_NAMES[key as keyof AllowableQuery]) {
      queryBuilder.andWhere(
        WHERE_NAMES[key as keyof AllowableQuery] as string,
        value,
      );
    }
  });

  if (!q || q === "") return await queryBuilder;

  queryBuilder.where("profile.name", "like", `%${q}%`);
  return await queryBuilder.debug(true);
}

export async function createNewUser(user: User, password: string) {
  console.log("user", user);
  const newUser = await db("user").insert({
    username: user.username ?? user.email,
    email: user.email,
    role_id: user.roleId,
  });

  const profile = await db("profile").insert({
    name: user.name,
    address: user.address,
    phone: user.phone,
    designation: user.designation,
    user_id: newUser[0],
    country_id: user.countryId,
    department_id: user.departmentId,
    manager_id: user.managerId,
  });

  await db("password").insert({
    user_id: newUser[0],
    password,
    is_active: true,
    plain_text: user.password,
    is_temporary: true,
  });

  return await getUserById(newUser[0]);
}
