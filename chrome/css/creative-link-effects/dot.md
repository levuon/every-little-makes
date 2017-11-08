# css


<li> show </li>

```css
  <li>show</li>

  li::before, li::after {
    opacity: 0;
    transition: transform .3s, opacity .3s;
  }
  li::before {
    content: "[";
    transform: translateX(20px);
  }
  li::after {
    content: "]";
    transform: translateX(-20px);
  }

```
