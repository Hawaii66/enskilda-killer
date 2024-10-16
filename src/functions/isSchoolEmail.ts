export const isSchoolEmail = (email: string) => {
  return (
    email.includes("@nykopingsenskilda.se") ||
    email.includes("@nykopingsenskilda.onmicrosoft.com") ||
    email.includes("@edu.nykopingsenskilda.se")
  );
};
