// Simple auth state management using localStorage
export const auth = {
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    window.dispatchEvent(new Event('authchange'));
  },
  
  clearUser: () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authchange'));
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  }
};

