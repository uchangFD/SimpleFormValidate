# Simple-Form-Validator

> 간단히 사용할 수 있는 Form Validator

<br/>

## Start

Form 생성자에는 Element 객체 또는 Selector[String]가 들어갈 수 있습니다.<br>

```javascript
var simpleFormValidator = window.SimpleFormValidator("form");
```

생성자 내부에서 Form 태그 내부에 Name 속성을 가지고 있는 값을 찾아 분류합니다.

<br>

## Useage

### `validation.create({name: string, matcher: [funciton | regexp], errorMsg})`

validate type을 생성

```javascript
simplreFormValidator.validation.create({
  name: "required",
  matcher: function(v) {
    return !!v;
  },
  errorMsg: "필수입력값입니다.",
});
```

### `validation.update(name: string, {name: string, matcher: [funciton | regexp], errorMsg})`

특정 validate type을 수정

```javascript
simplreFormValidator.validation.update("required", {
  name: "required",
  matcher: function(v) {
    return !!v;
  },
  errorMsg: "필수입력값입니다.",
});
```

### `validation.remove(name: string)`

특정 validate type을 삭제

return: [ValidationNode] (삭제된 validation node)

```javascript
simplreFormValidator.validation.remove("required");
```

### `validation.get(name: string)`

특정 validate type을 가져오기

return: [ValidationNode]

```javascript
simplreFormValidator.validation.get("required");
```

### `setType(name: string, types: [string | Array<string>])`

검사 할 태그의 validation type을 정의

```javascript
simpleFormValidator.setType("email", "required");
// or
simpleFormValidator.setType("email", ["required", "email"]);
```

### `validate(name: string)`

validate 할 메서드

```javascript
simpleFormValidator.validate("email"); // 부분 검사.
// or
simpleFormValidator.validate(); // 전체 검사.
```
