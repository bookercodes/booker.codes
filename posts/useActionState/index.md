---
title: Learn useActionState quickly
description: How to efficiently handle form state and validation errors with the useActionState hook in Next.js 15
date: 2024-11-16
layout: layouts/post.njk
---

When using a form, the [`useActionState`](https://react.dev/reference/react/useActionState) hook simplifies the process of capturing form values and passing them to a server action as [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

`useActionState` also manages state by automatically updating a `state` variable with the value returned from the server action. This is particularly helpful for rendering input field validation errors, as shown in the example below using [Zod](https://zod.dev/).

form.tsx:

```tsx
"use client";

import { useActionState } from "react";
import { signUp } from "../actions";

export default function SignUp() {
  const [state, action] = useActionState(signUp, {});

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={state.username}
          required
        />
        {state.errors?.username && (
          <p className="text-sm text-red-500">{state.errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={state.password}
        />
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>
      <input type="submit" value="Sign Up" />
    </form>
  );
}
```

actions.ts:

```ts
"use server";

import { z } from "zod";

const SignUpSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type SignUpActionState = {
  username?: string;
  password?: string;
  errors?: {
    username?: string[];
    password?: string[];
  };
};

export async function signUp(
  _prevState: SignUpActionState,
  form: FormData
): Promise<SignUpActionState> {
  const username = form.get("username") as string;
  const password = form.get("password") as string;

  const validatedFields = SignUpSchema.safeParse({
    username,
    password,
  });

  if (!validatedFields.success) {
    return {
      username,
      password,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // process validated form inputs here

  return { username, password };
}
```

`useActionState` returns an `isPending` property ([example](https://react.dev/reference/react/useActionState#display-information-after-submitting-a-form)) that indicates whether the server action's promise is still resolving.

Reference `isPending` to temporarily disable form elements, such as a submit button, preventing multiple submissions and providing your user with a visual indication of the loading state.

## useActionState vs useFormAction and useFormStatus

If you’re familiar with `useFormAction` and `useFormStatus`, you’ll find `useActionState` quite similar.

Essentially, it combines the functionality of both hooks and is renamed to reflect that server actions aren't just for forms (you can also use `useActionState` with buttons and other elements)

Keep in mind that `useFormStatus` is deprecated as of Next.js 15, so you should import `useActionState` moving forward.
