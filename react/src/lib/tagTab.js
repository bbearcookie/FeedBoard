import { createRef } from "react";

export const getRefs = (tags) => {
  let refs = [];
  tags.map(tag => refs.push(createRef(null)));
  return refs;
}

export const getActivePos = (tags, refs, id) => {
  let prevId = -1; // 이전에 클릭했던 태그 id
  let nowId = -1; // 현재 클릭한 태그 id
  let distance = 0; // 애니메이션 얼만큼의 거리만큼 줘야할지 계산

  tags.forEach((tag, i) => {
    // 이전에 클릭했던 태그 정보
    if (tag.active) {
      prevId = i;
    }

    // 현재 클릭한 태그 정보
    if (id === tag.id) {
      nowId = i;
    }

    // 이전에 클릭했던 태그와 현재 클릭했던 태그 사이의 거리 계산
    if (prevId <= -1 || nowId <= -1) {
      if (prevId >= 0 || nowId >= 0) {
        if (refs[i].current) {
          distance += refs[i].current.offsetWidth;
        }
      }
    }
  });

  // 이전에 클릭했던 태그가 없으면 distance는 0임.
  if (prevId === -1) {
    distance = 0;
  }

  // 거리 양수 음수 계산
  if (prevId - nowId < 0) {
    distance *= -1;
  }
  return distance;
}