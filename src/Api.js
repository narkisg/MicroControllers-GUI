// // api for the client side :)
// import React, { useEffect } from "react";
// import * as io from "socket.io-client";

// var socket;
// socket = io("http://localhost:5000");

// // listening to the server
// socket.on("list", (list) => {
//   console.log(list);
//   alert(list["controllers"]);
// });

// // calling the server
// const clickHandler = () => {
//   socket.emit("getlist", { message: "the test worked :)" });
// };

// const clickExitHandler = () => {
//   socket.emit("exit");
// };

// const clickListPortsHandler = () => {
//   socket.emit("list_of_ports");
// };

// function apiLogInA(cb) {
//   socket.on("login_response", (reply) => {
//     // from json to js (???):
//     if (reply.success) {
//       alert("adi is the best and the usr is loged in!");
//     } else {
//       console.log(reply.msg);
//     }
//   });
// }

// function apiExample() {
//   socket.on("list", (list) => {
//     console.log(list);
//     alert(list["controllers"]);
//   });
// }

// function apiExample2() {
//   socket.emit("apiExample", { message: "the test worked :)" });
// }

// // async function handleSubmit(event) {
// //   event.preventDefault();

// //   try {
// //     await Auth.signIn(email, password);
// //     userHasAuthenticated(true);
// //     history.push("/");
// //   } catch (e) {
// //     alert(e.message);
// //   }
// // }
// // import * as io from "socket.io-client";
// // var socket;
// // socket = io("http://localhost:5000");

// const getLogin = () => {
//   socket.on("login_response", (reply) => {
//     // from json to js (???):
//     if (reply.success) {
//       alert("adi is the best and the usr is loged in!");
//     } else {
//       console.log(reply.msg);
//     }
//   });
// };

// const setLogin = (username1, password1) => {
//   socket.emit("login_attempt", {
//     username: username1,
//     password: password1,
//   });
// };

// export { getLogin, setLogin };
