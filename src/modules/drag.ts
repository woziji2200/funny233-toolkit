import { Directive, DirectiveBinding } from "vue";

export const vDrag: Directive<any, void> = (
  el: HTMLElement,
  bingding: DirectiveBinding
) => {
  let moveElement: HTMLDivElement = el.firstElementChild as HTMLDivElement;
  // console.log("el", moveElement);
  const mouseDown = (e: MouseEvent) => {
    var disx = e.pageX - el.offsetLeft;
    var disy = e.pageY - el.offsetTop;
    const move = (e: MouseEvent) => {
      // 鼠标位置-鼠标相对元素位置=元素位置
      let left = e.clientX - disx;
      let top = e.clientY - disy;
      // 限制拖拽范围不超出可视区
      if (left <= 0) {
        left = 5; // 设置成5,离边缘不要太近
      } else if (left > document.documentElement.clientWidth - el.clientWidth) {
        // document.documentElement.clientWidth屏幕可视区宽度
        left = document.documentElement.clientWidth - el.clientWidth - 5;
      }

      if (top <= 0) {
        top = 5;
      } else if (
        top >
        document.documentElement.clientHeight - el.clientHeight
      ) {
        top = document.documentElement.clientHeight - el.clientHeight - 5;
      }

      el.style.left = left + "px";
      el.style.top = top + "px";
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    });
  };
  moveElement.addEventListener("mousedown", mouseDown);
};

// 