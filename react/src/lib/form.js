// name이 fieldName인 input 요소를 포커싱함.
export function focus(inputs, fieldName) {
  inputs.find(input => input.name === fieldName).ref.current.focus();
}

// inputs로 정의된 input 정보들을 가지고 초기 상태를 객체로 만들어서 반환함.
export function getInitialValues(inputs) {
  const form = {};
  inputs.forEach(input => form[input.name] = '');
  return form;
}