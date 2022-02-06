// name이 fieldName인 input 요소를 포커싱함.
export function focus(inputs, fieldName) {
  inputs.find(input => input.name === fieldName).ref.current.focus();
}

// // submit 이벤트가 동작한 form 태그의 모든 input의 value를 객체 형태로 반환함.
// export function getForm(e, inputs) {
//   const form = {};
//   inputs.forEach(input => form[input.name] = e.target[input.name].value);
//   return form;
// }

// inputs로 정의된 input 정보들을 가지고 초기 상태를 객체로 만들어서 반환함.
export function getInitialValues(inputs) {
  const form = {};
  inputs.forEach(input => form[input.name] = '');
  return form;
}