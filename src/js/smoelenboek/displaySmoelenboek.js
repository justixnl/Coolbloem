import { getDateInText } from "./../utils/utils.js";

const smoelenboekList = $("#smoelenboek-list"); // selects the smoelenboek-list element. This display all the the personnel
const upComingBirthday = $("#upComingBirthday"); // s

/**
 * This will show a list of people
 * @param {*} personnelList - An array of people
 */
export const showSmoelenboekList = (personnelList) => {
  personnelList.reverse();
  personnelList.forEach((item) => {
    const smoelenboekComponent = $(`
        <article class="smoelenboek-article">
            <div class="profile-avatar">
                <img src="/src/assets/${item.avatar}" alt="">
            </div>
            <div class="profile-content">
                <div class="profile-name">
                    <p>${item.FirstName} ${item.LastName}</p>
                </div>
                <div class="profile-telephoneNumber">
                    <p><span>Tel.</span> ${item.Telephonenumber || "nvt"}</p>
                </div>
                <div class="profile-email">
                    <p> ${item.Email || "nvt"}</p>
                </div>
            </div>
        </article>`);

    smoelenboekList.append(smoelenboekComponent);
  });
};

/**
 * will display a UpComingBirthday component
 * @param {*} person - Object of the person in questipn
 */
export const showUpComingBirthday = (person) => {
  const dateInText = getDateInText(person.DateOfBirth);

  const upComingBirthdayComponent = $(`
        <div class="upcoming-birthday">
            <h1 class="let-op">OPGELET!</h1>
            <h2 class="text-align-center"> ${dateInText.day} ${dateInText.month} is ${person.FirstName} jarig!</h2>
            <h3 class="text-align-center">Vergeet deze persoon niet te feliciteren!</h3>
        </div>
        <article class="smoelenboek-article upcoming-birthday-article">
            <div class="profile-avatar">
                <img src="/src/assets/${person.avatar}" alt="">
            </div>
            <div class="profile-content">
                <div class="profile-name">
                    <p>${person.FirstName} ${person.LastName}</p>
                </div>
                <div class="profile-telephoneNumber">
                    <p><span>Tel.</span> ${person.Telephonenumber || "nvt"}</p>
                </div>
                <div class="profile-email">
                    <p> ${person.Email || "nvt"}</p>
                </div>
            </div>
        </article>`);

  upComingBirthday.append(upComingBirthdayComponent);
};
