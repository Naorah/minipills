import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'

import { db } from '$lib/database'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export const load = async () => {
  // todo
}

const register = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  const user = await db.user.findUnique({
    where: { username },
  })

  if (user) {
    return fail(400, { user: true })
  }

  await db.user.create({
    data: {
      username,
      password_hash: await bcrypt.hash(password, 10),
      user_auth_token: crypto.randomUUID(),
      role: { connect: { name: Roles.USER } },
    },
  })

  redirect(303, '/login')
}

export const actions = { register }