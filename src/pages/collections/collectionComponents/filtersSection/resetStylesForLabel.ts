const resetRadio = () => {
  const radio = Array.from(document.querySelectorAll('label'));
  if (radio) {
    radio.forEach((el) => {
      if (el.classList.contains('radio-button--checked'))
        el.classList.remove('radio-button--checked');
    });
  }
};

export { resetRadio };
