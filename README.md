div style="text-align: center;">
  <h1>Gift Certificate System React</h1>
</div>

1. [Project Overview](#project-overview)
2. [Built With](#built-with)
3. [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup and Execution](#setup-and-execution)
4. [General Requirements](#general-requirements)

## Project Overview

  <b>Gift Certificate System React</b> is a UI designed for manipulation of gift certificates. It is specifically designed to handle certificate-related operations within the API and doesn't offer a comprehensive UI for the entire system.

  This project was conceived and developed as a part of the <b>EPAM LAB</b> training program as last module. More detailed here: [General Requirements](#general-requirements)<br><br>
  <b>API part:</b> <a href="https://github.com/elpeanuto/gift-certificate-system.git"> API repository</a>

---

## Built With

* React
* React Bootstrap
* React Router DOM

---

## Installation

### Prerequisites

1. <b>Port Configuration:</b> 
In case you've launched the API on a port other than the default `8081`, you can adjust the port setting in the `package.json`` file. Modify the port value in the proxy parameter as shown below:
```
  "proxy": "http://localhost:8081/"
```

### Step 1: Setting Up the Project

To set up and run this project, follow these steps:

1. Open your preferred command-line interface.

2. Clone the project repository from the main branch using the following command:
```
  git clone -b main https://github.com/elpeanuto/gift-certificate-system-react
```
3. Enter the cloned repository directory:
```
  cd gift-certificate-system-react
```
4. Install dependencies and start application
```
  npm install && npm start
```

#### General requirements

1. EcmaScript, JSX (https://reactjs.org/docs/introducing-jsx.html)
2. Development Environment: Visual Studio Code or any
3. create-react-app https://github.com/facebook/create-react-app
4. The Latest version of React 
5. Node & NPM
6. HTML5
7. The Latest version of CSS
8. Refreshing of a page should not affect pagination.
9. Duplication of browser’s tab should lead to exactly the same page (pagination, etc.). Modals may be hidden. Local storage may be used only for security and profile info purposes. All search state should be in url. 
10. Styles of header and footer should be implemented according to the mockups, should be static and be stuck to the top and on the bottom of the page.
11. Code should be readable, easy maintainable and reusable. 
12. Follow component-based application structure.
13. Screenshots of working application should be attached to a merge request. 

All requirements here: <a href="https://github.com/mjc-school/MJC-School/blob/old/stage%20%233/java/module%20%237.%20UI/react/react_task.md">Module 8</a>

### Pages

#### Login page
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/024de8e7-1dcc-41e0-943b-7cf7ed24e2b2)

#### Login page (errors)
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/84120e37-1d0e-4fb4-a188-11c4a6ac9a81)

#### Main page
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/ca12ecbf-3c1a-4966-abb4-406787fa8ee4)

#### Main page (error)
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/abdb7468-02a2-4b42-96ef-c3676f3cc07d)

#### Add Modal
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/518421e7-f580-40d0-b330-2a11ecb0e6fb)

#### View Modal
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/9e4446c9-48c7-4f00-aa30-d7795a82086a)

#### Edit Modal
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/de81bf96-6a98-4ed1-ab2f-16452888ed13)

#### Delete Modal
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/a6fef48c-4749-4b20-a4ce-152bb3c1021d)

#### Modal (error)
![image](https://github.com/elpeanuto/gift-certificate-system-react/assets/78732977/e97e82d6-5ddf-446a-be60-db83f8c29ab0)





