# Group Project - Drive Time Application

-- RMIT University - Saigon South Campus

## Table of Contents

<details>
    <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#description">Description</a>
    </li>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#credits">Credits</a>
      <ul>
        <li><a href="#contributors">Contributors</a></li>
        <li><a href="#third-party-attributions">Third-party Attributions</a></li>
        <li><a href="#other-acknowledgements">Other Acknowledgements</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Description
The team project re-builds taxi booking app using React Native - cross platform framework, and Firebase to store the database. For frontend, the team uses React Native Paper and Tailwind CSS to style following the available design from Uber app.
## Build With

![](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Backend
![](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

### Frontend
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
#### Others
![](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
- And stripe API for transaction performance.

## Features
### Boarding Screen
- This boarding screen has 3 subpages. We can choose either `skip` to move to Home screen or `next` to explore the app.
<img width="399" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/06df7282-dfd1-4f5a-af83-e37d5ab40db2">


### Authentication Screen
#### Signin Screen
- In this screen, the user is required to input username or password to continue using the app. Besides, they can renew their password, login using Google account, or register a new account.
<img width="417" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/2720ed2e-f24f-4f9b-9eba-39c4edfe428e">


- Below screen is if they choose to login using Google account
<img width="403" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/8c68c747-6efd-418d-882a-a4230947d95f">


#### Signup Screen
- From login screen, after clicking `register`, the current page now is Register Screen. Firstly, they need to register account with two input fields, including `email`, and `password` first.
<img width="403" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/d5b5aabf-25b6-4c5c-a6ea-3586b5f71682">
<img width="408" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/6a9bab6b-1286-468f-afe7-58bd05821ad4">


- Then the user has to enter the rest information of the account, including: name, username, phone, data of birth, gender (because our system is in primary version, so there are not many choices for genders),
<img width="410" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/b086a5ee-5244-46ec-8ca2-e08d371f77ba">


#### Home Screen
- We required the user location to ensure the app can track to get the customer to the driver.
<img width="412" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/b571b3f5-711e-4d8f-82e5-870c3f23811d">


- This is our home screen. In home screen, the user can search destinations through search bar, or perform booking actions through `Suggestions` section. 
<img width="397" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/73e68a03-6d29-4c7e-af92-4cf208f12fb9">
<img width="403" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/e274e51f-33a0-485f-9147-56947752f585">


- They can also view nearby popular places through `Explore nearby`:
<img width="404" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/d7dc3dac-386f-4717-abcb-f58d7b3177c3">


- There is also instruction section where the customer can see how to book the app, or how to use the app.
<img width="419" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/c1f35963-f0ef-45f2-adb4-15e80f858472">
 

#### Explore Nearby Screen
- This screen is navigated from Home Screen.
- The users can view nearby popular places or filter the nearby places based on store types, and rating, and any other categories:
<img width="397" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/6c65e155-122d-4ff3-afa0-d1cd9bb6dadc">
<img width="406" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/15fddd2b-7678-483e-a011-2c5d66f01954"


#### Booking Screen
- This screen is navigated from Home Screen
- In this screen, there are currently 2 input fields, icluding pick-up place and destination, and a displayed map rendered from Google Map API.
<img width="400" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/3dc5bd10-9e6b-45a7-b5d0-8f359c08dc70">


- When inputting a place, there is place suggestion section:
<img width="415" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/eb601dc8-853f-497b-acdb-d6c847aa8216">
<img width="409" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/85af6478-bf7b-47bf-a3cc-e7f23e27c67a">


- Then the screen will display route from pick-up location to destination, and the distance between those places.
- It also prompts the customer to choose car among the option, vouchers, and transaction method.
- The customer can also interact with the map by dradding, zoom in, or zoom out.
<img width="411" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/147d158e-8fac-4bf7-bd70-4f8500ec49c6">
<img width="411" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/d6a605ac-ecea-4d21-b493-b42d92bf872a">


- Here is the UI after choosing a vehicle option:
<img width="409" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/f9a56143-1536-4947-b98a-d071b1449654">


- After clicking to confirm booking, the screen displays `searching driver`.
- There is also pulsing animation when searching a driver.
<img width="412" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/0497af08-3e29-49a9-ba3e-f2aed2fd1843">


- After found a driver:
<img width="416" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/afd8848f-0506-4599-b9bd-05bf09230f55">


- The customer is required to input transaction information to pay before performing booking. Inside this, we can also have card validation.
<img width="411" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/84f58517-8d24-4e0e-976a-25e9d190b7ac">
<img width="412" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/c54b8752-99c6-47b9-a4b1-0c8ae5ba78f6">
<img width="422" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/0e027b1b-6e39-4794-952c-13e8a1fb108e">
<img width="410" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/ae5bc0ef-c8eb-41d2-bb48-6234994f8ec0">
<img width="411" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/ef40f9d9-d8bf-46ae-b1d5-cd15194a6773">


- We skip the riding process. Then, click, `Done` to finish the drive. Now, we navigate to Review screen.

#### Chat Screen
- From Booking Screen, when found a driver, the customer can chat with driver by pressing `Chat with Driver`. The below screen is chat driver.
<img width="401" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/870da09a-4257-48e6-98b6-42113d542eba">
<img width="410" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/73e59eea-d473-4ec7-814f-13e60d5aa8c8">


#### Review Screen
- After finishing the drive, the customer now is in Review Screen.
<img width="407" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/b0638c16-658f-4476-bcfc-9685bc840553">
<img width="409" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/e5e7ec82-6111-452c-89e3-7b94c2eacda3">
<img width="412" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/00f76b1d-6cb3-4988-b79a-da440a2af12e">


#### Voucher Screen
- The user can view list of available vouchers, and filter these vouchers based on car category.
<img width="397" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/fa27f8f8-ff69-427c-889f-d627c40232a0">


#### Profile Screen
- This is our profile screen.
<img width="408" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/32c97dcb-269b-455c-8244-5e271ede6901">


- The user can update their user profile information.
<img width="406" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/e238f7b9-2fad-43a9-9d4e-f15176f0e5ef">

- Besides, they can also view their message history by clicking on `messages` section. 
- We can navigate to About Us screen from this section.
- Or can use SOS functionality after clicking `Safety Report`:
<img width="402" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/af1760b5-9920-44d0-9dff-fa7ff8f2392b">


- With 2 options, the first one `Edit/add SOS` to prompt user to input their Emergency contact information or edit the old contact one.
<img width="420" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/757f5bb2-0673-4d81-865a-d4ccea66df79">


- The second option is `Trigger SOS`, which counting down from 120 seconds to provide music for this feature:
<img width="361" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/ebe824f5-5e55-45c8-8aa2-b4db3a915175">


#### Admin Dashboard
- To go to this, first the user has to logout and login as an admin account.
<img width="422" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/03491d2c-40c1-4179-9fff-352f6f7509f0">


- From this, they can view user list and perform CRUD action:
<img width="410" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/2609d1c5-4ee7-4660-a433-fccc8995b173">


- Or view and perform CRUD action on voucher list:
<img width="411" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/03b274d2-ac45-4bdc-b627-880d05d144a5">


- Or view and perform CRUD action on membership list:
<img width="421" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/d57d0c7e-8860-403c-b7a6-1681e98d6922">




#### About Us
- This is navigated from Profile Screen. We can view team members, license, copyright, contact information and some statistics.
<img width="419" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/69646934-ead6-4fb6-97ce-edf475202548"> 
<img width="404" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/0dcb7bb6-df76-46da-ade1-e0c22b3d53e6">
<img width="414" alt="image" src="https://github.com/Puppychan/drive-time-app/assets/32950625/94a25ac3-8f58-406d-88b7-e2c989028b85">


## Installation

- Clone this project
- Open Project Folder
- Open terminal in root directory:
  - Run `npm install` to install all dependencies
  - Run one of the following commands
    `npm start`: for expo build -> then run `s` -> `a`
    `npm run dev`: for android development build -> then run `a`
    If there is error `No development build available` -> run `s` -> run `a`
    Please wait for at least 30 minutes to allow it to run
    Please assure your computer is charging when running this
### Cautions

- On MacOS and possibly in Windows:
  - If you have error with `npm run android`:
    - Make sure you have installed Android Studio and run device emulator
    - Run:
      `echo 'export PATH=$PATH:~/Library/Android/sdk/platform-tools' >> ~/.zshrc`
      `source ~/.zshrc` to update echo
      `adb devices` to check if your device is connected
    - Make sure java version is 11 by typing `java --version`:
      - If not version 11, install it by `brew install openjdk@11` and `brew install jenv` to set java version
      - Run `brew --prefix openjdk@11` to find location of java 11
      - Run `jenv add /result-of-above-command/libexec/openjdk.jdk/Contents/Home` to add java 11 to jenv
      - Move terminal to root directory of this project and run `jenv local 11` to set java version to 11 (if 11 is not valid, run specified version of java 11)
    - Run `npm install -g expo-cli`
    - Also run `npm update`
    - Now rerun `npx expo start`
  - If there is error which is relevant to `CommandError: No development build (com.drivetimeapp) for this project is installed. Please make and install a development build on the device first.`:
    - Rerun `expo run:android`
  - If still cannot rerun: run `npm run --reset-cache` and rerun `npx expo start`

### Other Commands Usage

- Check if any code error: `npm run check-typescript`
- Check any error with eslint: `npm run check-eslint`
  -> If there is any error, run `npm run check-eslint --fix` to fix it automatically
- Combine both commands above: `npm run lint`

## Features
- If driver has not register car -> they cannot receive passenger
- Filter inside account: filter list of drivers, list of customers, list of admins, filter based on membership
- Sort account list (by name, by created, by updated, by review rate)
- Update account, update nested entity - transport inside account
- Delete account
- More in proposal

## Technologies
- For database and backend: Firestore, firebase auth, firebase
- For frontend: React Native Android and Expo
- Styling: react native paper, unsplash images, google map api, stripe for payment

- Admin: user284@mail.com
- Customer: user424@mail.com

## Credits

### Contributors

| Name                 | Student ID | GitHub Profile                                                  | Contribution (%) |Work |
| -------------------- | ---------- | --------------------------------------------------------------- | ---------------- |---------------- |
| Tran Mai Nhung       | s3879954   | [Puppychan](https://github.com/Puppychan)                       | 20%              |Backend and front end - multi destinations booking           |
| Tran Nguyen Ha Khanh | s3877707   | [hakhanhne](https://github.com/hakhanhne)                       | 20%              |Backend and front end - sos, authentication              |
| Nguyen Dinh Viet     | s3927291   | [felix101003](https://github.com/felix101003)                   | 20%              |Backend and frontend - google map              |
| Doan Huu Quoc        | s3927776   | [Mudoker](https://github.com/Mudoker)                           | 20%              |Backend and front end - algorithms, call              |
| Tran Vu Quang Anh    | s3916566   | [tranvuquanganhRMIT87](https://github.com/tranvuquanganhRMIT87) | 20%              |Backend and front end -     voucher, payment          |

### Third-party Attributions

[Flowbite](https://flowbite.com)

### Other Acknowledgements
- [Map Image on Home Screen](https://www.vecteezy.com/vector-art/7017843-abstract-polygon-world-map-vector-illustration-geometric-structure-in-blue-color-for-presentation-booklet-website-and-other-design-projects-polygonal-background)

## Contact

- Tran Mai Nhung - s3879943:

  - Email: s3879954@rmit.edu.vn - nhungmaitran1412@gmail.com
  - Github profile: [Puppychan](https://github.com/Puppychan)
  - Linkedin: [Nhung Tran](https://www.linkedin.com/in/nhung-tran-528396210/)

- Tran Nguyen Ha Khanh - s3877707:

  - Email: s3877707@rmit.edu.vn

- Nguyen Dinh Viet - s3927291:
  - Email: s3927291@rmit.edu.vn
- Doan Huu Quoc - s3927776:
  - Email: s3927776@student.rmit.edu.au
- Tran Vu Quang Anh - s3916566
  - Email: s3916566@rmit.edu.vn
