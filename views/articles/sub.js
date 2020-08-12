const firebaseConfig = {
  apiKey: "AIzaSyDqWjirHDpVYbM63fyz1YKbsOnAQ5ynAhc",
  authDomain: "samyak-personal.firebaseapp.com",
  databaseURL: "https://samyak-personal.firebaseio.com",
  projectId: "samyak-personal",
  storageBucket: "samyak-personal.appspot.com",
  messagingSenderId: "653889786069",
  appId: "1:653889786069:web:14d374d33e41d2f2dcd25c",
};
firebase.initializeApp(firebaseConfig);
var count,
  database = firebase.database(),
  emailRef = database.ref("showgist/subs/emails"),
  countRef = database.ref("showgist/subs/number");
function getInputVal(e) {
  return document.getElementById(e).value;
}
function submitForm(e) {
  saveEmail(getInputVal("email")),
    database.ref("showgist/subs/").update({ number: count + 1 });
}
function saveEmail(e) {
  emailRef.push().set({ email: e }),
    (document.querySelector(".alert").style.display = "block"),
    (document.querySelector(".alert").style.marginBottom = "50px");
}
countRef.on("value", function (e) {
  count = e.val();
}),
  document.getElementById("sub-form").addEventListener("submit", submitForm),
  (document.onkeydown = function (e) {
    return (
      !e.ctrlKey ||
      (67 !== e.keyCode &&
        86 !== e.keyCode &&
        85 !== e.keyCode &&
        117 !== e.keyCode) ||
      (console.log("nope"), !1)
    );
  });
