function Icon({ name, size = 18, className = "" }) {
  const paths = {
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    arrowUp: <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 17a2 2 0 0 1 2-2h14"/></>,
    openBook: <><path d="M12 7v14"/><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23V5.5ZM21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 1 2.5 2V5.5Z"/></>,
    cap: <><path d="m2 10 10-6 10 6-10 6-10-6Z"/><path d="M6 12.4V17c3.5 3 8.5 3 12 0v-4.6M22 10v6"/></>,
    flask: <><path d="M9 3h6M10 3v7l-5.5 9.1A1.9 1.9 0 0 0 6.1 22h11.8a1.9 1.9 0 0 0 1.6-2.9L14 10V3"/><path d="M8 16h8"/></>,
    ruler: <><path d="m4 4 16 16"/><path d="m3 7 4-4 14 14-4 4L3 7Z"/><path d="m8 8 2-2M11 11l2-2M14 14l2-2"/></>,
    language: <><path d="m4 5 8 0M8 3v2c0 5-2 8-5 10M5 9c1 2 3 4 6 5M14 19l4-10 4 10M15.5 16h5"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m13 11 7-7M16 4h4v4"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3"/></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></>,
    down: <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export default Icon;
