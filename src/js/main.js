/*
  TODO:
  [x] Add inverted class to body for Tumblr...
  [ ] Fix tablet scaling for oovoo on smaller screens
  [x] Hide phone, don't slide tablet on smaller screens for oovoo
  [x] Only one monitor, don't slide for swfcorp on smaller screens
  [x] Tumblr copy
  [x] Tumblr card html, css
  [ ] Save out all svgs from Tumblr site
  [ ] Add js from Tumblr site
  [ ] Footer social media hover states
  [ ] Pick better "project states" to jump to from nav...
  [x] Slide up laptop and tablet at different speeds for graber
  [ ] Animate screen content at different speeds for swfcorp
  [x] 2 columns of copy for trainspotted and tumblr
  [ ] Host on amazon/heroku? Leaning amazon
  [ ] Add modal image/container to trainspotted animation
  [ ] Shift up oovoo devices on desktop using css
*/

/* eslint-disable no-console */
import load from './modules/loader';
import menu from './modules/menu';
import tumblr from './modules/tumblr';

load();
menu();
tumblr();
/* eslint-enable no-console */
