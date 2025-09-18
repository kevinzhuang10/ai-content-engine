import { createClient } from './supabase/client'

export type SignUpData = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type SignInData = {
  email: string
  password: string
}

export const authApi = {
  signUp: async (data: SignUpData) => {
    const supabase = createClient()

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    return authData
  },


  signIn: async (data: SignInData) => {
    const supabase = createClient()

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return authData
  },

  signOut: async () => {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  },

  getUser: async () => {
    const supabase = createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      throw new Error(error.message)
    }

    return user
  },

  getSession: async () => {
    const supabase = createClient()

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      throw new Error(error.message)
    }

    return session
  },
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}