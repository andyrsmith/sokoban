const createButton = (text) => {
  const button = `
    <button class="button is-primary is-large">
      <span>${text}</span>
    </button>
    `

  return button
}

export {
  createButton
}