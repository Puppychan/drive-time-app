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

## Build With

![](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Backend

![](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

### Frontend

#### Others

![](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

## Installation

- Clone this project
- Open Project Folder
- Open terminal in root directory:
  - Run `npm install` to install all dependencies
  - Run one of the following commands
    `npm run android`: for android
    `npm run ios`: for ios
    `npm run web`: for web

### Cautions

- On MacOS:
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
    - Run `expo-cli upgrade`
    - Also run `npm update`
    - Now rerun `npm run android`

### Other Commands Usage

- Check if any code error: `npm run check-typescript`
- Check any error with eslint: `npm run check-eslint`
  -> If there is any error, run `npm run check-eslint --fix` to fix it automatically
- Combine both commands above: `npm run lint`

## Features

## Future Improvement

## Credits

### Contributors

| Name                 | Student ID | GitHub Profile                                                  | Contribution (%) |
| -------------------- | ---------- | --------------------------------------------------------------- | ---------------- |
| Tran Mai Nhung       | s3879954   | [Puppychan](https://github.com/Puppychan)                       | 20%              |
| Tran Nguyen Ha Khanh | s3877707   | [hakhanhne](https://github.com/hakhanhne)                       | 20%              |
| Nguyen Dinh Viet     | s3927291   | [felix101003](https://github.com/felix101003)                   | 20%              |
| Doan Huu Quoc        | s3927776   | [Mudoker](https://github.com/Mudoker)                           | 20%              |
| Tran Vu Quang Anh    | s3916566   | [tranvuquanganhRMIT87](https://github.com/tranvuquanganhRMIT87) | 20%              |

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
