// Get today's date
const today = new Date();

/**
 * Converts a date string to an Date object
 * @param {*} dateString
 * @returns a Date object
 */
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year + 2000, month - 1, day); // Assuming the year format is YY and adding 2000 to get YYYY
};

/**
 * Filter out the person with an upcoming birthday
 * @param {*} personnel - the array with personnel
 */
export const upcomingBirthday = (personnel) => {
  // This variable is initialized to Infinity to start,
  // as we want to find the smallest difference between today's date and a person's birthday.
  let closestBirthdayDiff = Infinity;
  let closestPerson = null;

  personnel.smoelenboek.forEach((person) => {
    const birthdate = parseDate(person.DateOfBirth);
    const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    const diffInDays = Math.abs(nextBirthday - today) / (1000 * 60 * 60 * 24); // Calculate difference in days

    if (diffInDays < closestBirthdayDiff) {
      closestBirthdayDiff = diffInDays;
      closestPerson = person;
    }
  });

  return closestPerson;
};
