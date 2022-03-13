export default function rippleEffect(e: MouseEvent | React.MouseEvent<HTMLElement>): void {
  const target = e.target as HTMLElement;

  const ripples = document.createElement('span');

  ripples.style.left = e.clientX - target.getBoundingClientRect().x + 'px';
  ripples.style.top = e.clientY - target.getBoundingClientRect().y + 'px';

  ripples.addEventListener('animationend', () => ripples.remove());

  target.appendChild(ripples);
}
