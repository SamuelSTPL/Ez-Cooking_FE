import { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
    line-height: 1;
    font-family: 'Nunito', sans-serif;
/* font-family: 'Sansita Swashed', cursive;
font-family: 'Titillium Web', sans-serif; */
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

export const Swing = keyframes`
  0% {
    transform: translateY(5px);
  }
  30% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(3px);
  }
  65% {
    transform: translateY(-3px);
  }
  80% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
  }
`;
