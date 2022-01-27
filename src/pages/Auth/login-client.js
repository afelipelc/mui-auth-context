import axiosClient from '../../config/axiosClient';

/**
 * Manage the post login request
 */
const loginClient = {
  login(user) {
    return axiosClient.post('/login', { email: user.email.replace(/\s/g, ''), password: user.password })
      .then((response) => {
        return { ...response, redirect: '/' };
      })
      .catch((error) => {
        return { errorCode: error.code, error: error.message };
      });
  },
};

export default loginClient;
