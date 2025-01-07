// utils/auth.ts
export const clearUserData = () => {
    localStorage.clear();
    sessionStorage.clear();
    
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  };
  
  export const openFreshLoginWindow = () => {
    clearUserData();
    // Using location.replace instead of window.open to avoid popup issues
    window.location.replace('/auth');
  };