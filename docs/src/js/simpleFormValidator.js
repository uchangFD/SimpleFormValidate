const simpleFormValidator = new window.SimpleFormValidator("#form");
const validation = simpleFormValidator.validation;

validation.create({
  name: "required",
  matcher: function(v) {
    return !!v;
  },
  errorMsg: "필수 입력란입니다.",
});

validation.create({
  name: "email",
  matcher: /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/,
  errorMsg: "이메일 형식이 아닙니다.",
});

validation.create({
  name: "password",
  matcher: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,24}$/,
  errorMsg: "비밀번호 형식이 아닙니다.",
});

validation.create({
  name: "confirmPassword",
  matcher: (v) => {
    const passwordValue = document.querySelector('[name="password"]').value;
    return v === passwordValue;
  },
  errorMsg: "비밀번호가 다릅니다.",
});

export default simpleFormValidator;
