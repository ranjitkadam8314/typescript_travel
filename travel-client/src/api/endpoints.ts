export default {
  serverBaseURL: "http://localhost:9999",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getone: "/users/",
      getAll: "/users",
    },

    destinations: {
      create: "/destinations",
      update: "/destinations/",
      delete: "/destinations/",
      getone: "/destinations/",
      getAll: "/destinations",
    },
    auth: {
      userLogin: "/auth/login",
      validateToken: "/auth/validate-token",
      resetPassword: "/auth/reset-Password",
      refreshToken: "/auth/refresh-token",
    },
  },
};
