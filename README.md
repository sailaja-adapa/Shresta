<div align="center">
  <img width="400" alt="Shresta City Insight" align="center" src="image.png">
</div>
<hr>

<div align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" />&nbsp;
  <img src="https://forthebadge.com/images/badges/uses-brains.svg" />&nbsp;
  <img src="https://forthebadge.com/images/badges/powered-by-responsibility.svg"/>
</div>
<br>
<div align="center">
  <table align="center">
    <thead align="center">
      <tr border: 1px;>
        <td><strong>ðŸŒŸ Stars</strong></td>
        <td><strong>ðŸ ´ Forks</strong></td>
        <td><strong>ðŸ › Issues</strong></td>
        <td><strong>ðŸ”” Pull Requests</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="https://github.com/sailaja-adapa/Shresta/stargazers" target="_blank"><img alt="Stars" src="https://img.shields.io/github/stars/sailaja-adapa/Shresta?style=for-the-badge&logo=github"/></a></td>
        <td><a href="https://github.com/sailaja-adapa/Shresta/forks" target="_blank"><img alt="Forks" src="https://img.shields.io/github/forks/sailaja-adapa/Shresta?style=for-the-badge&logo=git&logoColor=white"/></a></td>
        <td><img alt="Total Issues" src="https://img.shields.io/github/issues-search/sailaja-adapa/Shresta?query=is:issue&style=for-the-badge&label=Issues&logo=github&color=blue"/></td>
        <td><img alt="Total PRs" src="https://img.shields.io/github/issues-search/sailaja-adapa/Shresta?query=is:pr&style=for-the-badge&label=Pull%20Requests&logo=github&color=blue"/></td>
      </tr>
    </tbody>
  </table>
</div>

<hr>

## Problem Statement ðŸ˜–

Urban areas face critical challenges like waste management inefficiency, traffic issues, and unsafe public spaces. At the same time, citizens often struggle to report such problems effectively. This leads to delayed resolutions, further deteriorating the environment and public well-being.

**Shresta-City Insight** aims to solve this by providing a platform for citizens to report civic issues like garbage on roads, traffic hazards, etc., ensuring timely action and reducing environmental impact.

---

## Proposed Solution ðŸ¤©

**Shresta-City Insight** allows users to report issues, track resolutions, upload evidence (such as photos), and receive notifications about the progress of their complaints. It leverages **Firebase** for backend services, and **Twilio** for real-time SMS notifications, keeping users informed about their reports.

---

## Glimpse âœ¨
Check out the live demo of the platform [Shresta City Insight](https://shresta.vercel.app/)

---

### How to Set Up

To get started with **Shresta-City Insight** ðŸš€, make sure you have **Node.js** and **npm** installed on your machine ðŸ’».

1) To check this, you can type **node -v** and **npm -v** in the terminal.
2) **Fork** the repo ðŸ ´ by clicking the fork button on GitHub and give it a name.
3) **Clone** it to your local machine using:

    ```sh
    git clone https://github.com/yourusername/projectname.git
    ```

4) **Navigate** to the project directory:

    ```sh
    cd projectname # Example: cd Shresta-city-insight
    ```

5) **Install** the dependencies ðŸ”§:

    ```sh
    npm install  
    ```

6) Start the local server ðŸŒ :

    ```sh
    npm start
    ```

    This will launch the development server at:
    ðŸ‘‰ **http://localhost:3000/** ðŸ–¥ï¸

## Tech Stack Used

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black">
  <img src="https://img.shields.io/badge/ReactJS-61DAFB.svg?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black">
  <img src="https://img.shields.io/badge/NodeJS-339933.svg?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000.svg?style=for-the-badge&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/Twilio-000000.svg?style=for-the-badge&logo=Twilio&logoColor=white">
</div>

---

## Features

- **Civic Issue Reporting**: Report issues with real-time tracking.
- **Secure User Authentication** and Authorization.
- **OTP Authentication** using Firebase for secure user verification.
- **Real-time Notifications** via SMS using Twilio.
- **Scalable Infrastructure** with Firebase services.

## Workflow
  + **Citizen Workflow ðŸ‘©â€ ðŸ¦°:**
    - The user is required to register using their Google email ID (@gmail.com) for authentication and must provide the required details.ðŸ“©
    - The user logs in using registered email Id and password.ðŸ”
    - The user provides their location manually or allows it to be retrieved via an API. ðŸ“
    - An OTP is sent to their registered mobile number for verification, which must be entered to proceed. ðŸ”¢
      <br>  
      ![OTP message](OTP_msg.png)
      <br>  
   
    - Upon successful verification, the user is redirected to the Complaint Submission Portal where they can report civic issues by uploading relevant images or documents. ðŸ“¸ðŸ“
    - Alternatively, users can utilize voice input to lodge a complaint, which is transcribed into text via a Speech-to-Text API. ðŸŽ™ï¸ ðŸ—£ï¸
    - After submitting the complaint, the user is navigated to the Thank you Page, where they have the option to provide feedback on their experience. âœ ï¸
    
  + **Officer Registration & Complaint Management Process ðŸ‘®â€ â™‚ï¸ ðŸ“‹**
    

    - Officers are required to register using an official email ID with the "@svecw.edu.in" domain, as this domain is exclusively designated for authorized personnel. âœ‰ï¸ âœ…
    - Upon successful login, officers gain access to the Complaint Management Dashboard, where they can review all submitted complaints along with their corresponding images. ðŸ–¥ï¸ ðŸ“¸
    - When an officer marks a complaint as resolved and selects the delete option, an automated notification is sent to the complainant via Twilio, informing them of the resolution. ðŸ“©ðŸ””
      <br>  
      ![Issue Resolved message](Resolved_message.png) 
      <br>  
    


## Our Goals ðŸŽ¯

The project aims to tackle social issues like waste management, civic improvements, and community-driven change.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

<h3 align="center"> Show some â ¤ï¸ by starring this awesome repository! </h3>